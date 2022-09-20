import React, { createRef, useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import * as html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import createMarkup from './template';
import { Bar } from 'react-chartjs-2';

import UXL from '../../components/UXL';
import Loader from '../../components/Loader';

import { getUser } from '../../utils/Auth';
import Api from '../../api';

import useWindowSize from '../../utils/WindowSize';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatisticsReportScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [markupHTML, setMarkupHTML] = useState('');
  const { t } = useTranslation();
  const [awidth] = useWindowSize();
  const user = getUser();

  const buildingsRef = createRef(null);
  const [buildingsData, setBuildingsData] = useState([]);
  const categoriesRef = createRef(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const weeksRef = createRef(null);
  const [weeksData, setWeeksData] = useState([]);
  const genOptions = () => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      layout: {
        padding: {
          top: 20,
          left: awidth < 992 ? 10 : 100,
          right: awidth < 992 ? 10 : 100,
          bottom: 20,
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'Number de tickets',
            font: {
              size: 12,
            },
          },
        },
      },
      maintainAspectRatio: false,
    };
  };

  useEffect(() => {
    _load();
  }, []);
  useEffect(() => {
    console.log('widthfor size ', awidth, window.screen.width);
  }, [awidth]);

  useEffect(() => {
    if (buildingsRef.current && categoriesRef.current && weeksRef.current) {
      exportPdf();
    }
  }, [buildingsRef, categoriesRef, weeksRef]);

  const _load = async () => {
    const _data = await getPdfData();

    const _markupHTML = createMarkup(_data);

    const _buildings = _data.buildingTickets;
    const _buildingsData = generateBuildingsData(_buildings);

    const _categories = _data.categoryTickets;
    const _categoriesData = generateCategoriesData(_categories);

    const _weeks = _data.weeklyTickets;
    const _weeksData = generateWeeksData(_weeks);

    setMarkupHTML(_markupHTML.__html);
    setBuildingsData(_buildingsData);
    setCategoriesData(_categoriesData);
    setWeeksData(_weeksData);

    setIsLoading(false);
    console.log(_data, '_data');
    exportPdf(_data);
  };

  const getPdfData = async () => {
    let response;
    try {
      response = await Api('get', `/dashboard/template_casefile_details/${user.id}`);
      console.log(response, 'response');
      return response?.data?.data;
    } catch (error) {}
  };

  const generateBuildingsData = (buildings) => {
    const labels = [];

    const gDataObj = {
      labels,
      datasets: [],
    };

    for (let i = 0; i < buildings.length; i++) {
      const building = buildings[i];
      labels.push(building.buildingName);
    }

    gDataObj.datasets.push({
      label: 'Bâtiments',
      data: buildings.map((_) => _.ticketCount),
      backgroundColor: '#8CC8C8',
    });

    return gDataObj;
  };

  const generateCategoriesData = (categories) => {
    const labels = [];

    const gDataObj = {
      labels,
      datasets: [],
    };

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      labels.push(category.categoryName);
    }

    gDataObj.datasets.push({
      label: 'Catégories',
      data: categories.map((_) => _.ticketsNumbers),
      backgroundColor: '#8CC8C8',
    });

    return gDataObj;
  };

  const generateWeeksData = (weeks) => {
    const labels = [];

    const gDataObj = {
      labels,
      datasets: [],
    };

    for (let i = 0; i < weeks.length; i++) {
      const week = weeks[i];
      labels.push(week.weekName);
    }

    gDataObj.datasets.push({
      label: 'Catégories',
      data: weeks.map((_) => _.ticketsNumbers),
      backgroundColor: '#8CC8C8',
    });

    return gDataObj;
  };
  const managewidth = () => {
    // screen size 1920 fine
    if (window.screen.width >= 1700) {
      return 220;
    } else {
      // 1280 lt
      return 235;
    }
  };

  const exportPdf = async () => {
    let domElement = document.getElementById('templatebody');
    domElement.classList.add('displayClass');

    const htmlCanvas = await html2canvas(domElement, {
      ignoreElements: (_) => {
        if ('resultButtondiv' === _.id) {
          return true;
        }
      },
      width: window.screen.width >= 1600 ? '1900' : '1400',
      height: window.screen.width >= 1600 ? '2000' : '1600',
    });

    const pdf = new jsPDF(
      // orientation: 'p',
      // unit: 'in',
      // format: [700, 792],
      'p',
      'mm',
      'a4'
    );

    const imgProps = pdf.getImageProperties(htmlCanvas);

    const width = pdf.internal.pageSize.getWidth();

    const height = (imgProps.height * width) / imgProps.width;
    if (htmlCanvas) {
      ////firstone is left margin, secondone is marginbottom
      // pdf.addImage(htmlCanvas, 'PNG', 2, 15, window.screen.width >= 1600 ? 235 : window.screen.width >= 1500 ? 400 : 232, height);
      pdf.addImage(htmlCanvas, 'PNG', 2, 15, width, height);
      pdf.addImage(htmlCanvas, 'PNG', 2, 15, managewidth(), height);
    }

    const buildingsCanvas = buildingsRef.current.canvas;
    const categoriesCanvas = categoriesRef.current.canvas;
    const weeksCanvas = weeksRef.current.canvas;

    pdf.addImage(buildingsCanvas, 'PNG', window.screen.width >= 1600 ? 97 : 105, window.screen.width >= 1600 ? 32 : 40, 100, 30);
    pdf.addImage(categoriesCanvas, 'PNG', window.screen.width >= 1600 ? 95 : 105, window.screen.width >= 1600 ? 65 : 78, 100, 30);
    pdf.addImage(weeksCanvas, 'PNG', window.screen.width >= 1600 ? 40 : 50, window.screen.width >= 1600 ? 98 : 125, 100, 30);
    // displayClass
    domElement.classList.remove('displayClass');
    pdf.save('Doc.pdf');
    window.close();
  };

  return (
    <UXL appBarText="Statistiques">
      {isLoading ? (
        <Loader
          divStyle={{
            marginTop: '45vh',
          }}
        />
      ) : (
        <div
          className={`column ajc wh100`}
          style={{
            backgroundColor: '#F4F4F4',
            padding: '3% 2%',
            width: '100%',
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: `${markupHTML}` }}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
          <div
            style={{
              width: '100%',
              marginLeft: '',
            }}
            className="bar_conatiner"
          >
            <Bar options={genOptions('')} data={buildingsData} ref={buildingsRef} />
            <Bar options={genOptions('')} data={categoriesData} ref={categoriesRef} />
            <Bar options={genOptions('')} data={weeksData} ref={weeksRef} />
          </div>
        </div>
      )}
    </UXL>
  );
}

export default StatisticsReportScreen;
