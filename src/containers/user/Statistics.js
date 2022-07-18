import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import UXL from '../../components/UXL';
import Loader from '../../components/Loader';

import StatisticsHeadBlackSVG from '../../assets/StatisticsHeadBlack.png';
import StatisticsHeadGreenSVG from '../../assets/StatisticsHeadGreen.png';
import StatisticsHeadYellowSVG from '../../assets/StatisticsHeadYellow.png';

import { getUser } from '../../utils/Auth';
import Api from '../../api';
import { toast } from 'react-toastify';

import { Store, UpdateStore } from '../../StoreContext';
import useWindowSize from '../../utils/WindowSize';

import { months } from '../../utils/Constants';
import moment from 'moment';

const headArr = [
  {
    title: 'tickets créés',
    description: 'depuis le début',
    color: '#5B5B5B',
    background: StatisticsHeadBlackSVG,
  },
  {
    title: 'tickets résolus',
    description: 'depuis le débuts',
    color: '#44787B',
    background: StatisticsHeadGreenSVG,
  },
  {
    title: 'tickets',
    description: 'actuellement en cours',
    color: '#FF974D',
    background: StatisticsHeadYellowSVG,
  },
];

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatisticsScreen() {
  const { t } = useTranslation();
  const store = Store();
  const updateStore = UpdateStore();
  const [width] = useWindowSize();
  const user = getUser();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tickets',
      },
    },
    layout: {
      padding: {
        top: 20,
        left: width < 992 ? 10 : 100,
        right: width < 992 ? 10 : 100,
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

  useEffect(() => {
    _load();
  }, []);

  const _getLabels = (_) => {
    const arr = [];
    for (let i = 0; i < _.length; i++) {
      const obj = _[i];
      const date = new Date(obj.transactionDate);

      const dateMonth = date.getUTCMonth();
      const dateDay = date.getUTCDate();

      const month = months[dateMonth];
      const startDay = dateDay - 7 <= 0 ? 1 : dateDay - 7;
      const endDay = dateDay;

      const str = `${month} ${startDay}-${endDay}`;
      arr.push(str);
    }
    return arr;
  };

  const _load = async () => {
    const _data = await getStatistics();

    const labels = _getLabels(_data.graphicalData);
    const gDataObj = {
      labels,
      datasets: [],
    };

    const gDataArr = [];
    for (let i = 0; i < _data.graphicalData.length; i++) {
      let _ = _data.graphicalData[i];
      _ = Object.values(_);
      _ = [_[0], _[1], _[2]];
      gDataArr.push(_);
    }

    const gParsedDataArr1 = gDataArr.map((_) => _[0]);
    const gParsedDataArr2 = gDataArr.map((_) => _[1]);
    const gParsedDataArr3 = gDataArr.map((_) => _[2]);

    const gParsedDataArr = [gParsedDataArr1, gParsedDataArr2, gParsedDataArr3];

    for (let i = 0; i < headArr.length; i++) {
      const obj = headArr[i];
      gDataObj.datasets.push({
        label: obj.title,
        data: gParsedDataArr[i],
        backgroundColor: obj.color,
      });
    }

    updateStore({
      statistics: {
        ...store.statistics,
        ..._data,
        gData: gDataObj,
        isLoading: false,
      },
    });
  };

  const getStatistics = async () => {
    let response;
    try {
      response = await Api('get', `/dashboard/currentweek_casefile_details/${user.id}`);
      const _statistics = response.data.data;
      return _statistics;
    } catch (e) {
      console.trace(e);
    }
  };

  return (
    <UXL appBarText="Statistics">
      {store.statistics.isLoading ? (
        <Loader />
      ) : (
        <div
          className="column wh100"
          style={{
            backgroundColor: '#F4F4F4',
            padding: store?.sideBarSelectIndex == 1 && width < 993 && width > 667 ? '3% 5%' : '3% 2%',
            width: store?.isSideBar ? '97%' : '100%',
          }}
        >
          <div
            style={{
              width: store?.isSideBar && width < 992 ? '90%' : '100%',
              paddingLeft: store?.isSideBar && width < 667 ? '10%' : store?.isSideBar && width < 992 ? '5%' : '',
            }}
            className="row w100 header_list_container"
          >
            {headArr.map((_, __) => (
              <HeaderListTile {..._} width={width} count={Object.values(store.statistics.tilesData)[__]} />
            ))}
          </div>
          <div
            style={{
              width: store?.isSideBar && width < 667 ? '90%' : store?.isSideBar && width < 992 ? '95%' : '100%',
              marginLeft: store?.isSideBar && width < 667 ? '10%' : store?.isSideBar && width < 992 ? '5%' : '',
            }}
            className="bar_conatiner"
          >
            <Bar options={options} data={store.statistics.gData} />
          </div>
          <div
            style={{
              width: store?.isSideBar && width < 667 ? '90%' : store?.isSideBar && width < 992 ? '95%' : '100%',
              marginLeft: store?.isSideBar && width < 667 ? '10%' : store?.isSideBar && width < 992 ? '5%' : '',
            }}
            className="column jcc percentage_container"
          >
            <p style={{ marginLeft: '3%', padding: '1% 0%', color: '#4F4F4F', fontWeight: '600' }}>
              Emplacement avec la plupart des tickets
            </p>
            <div className="column jcc w100 building_details_scrollable">
              {store.statistics.buildingTickets.map((_, __) => (
                <div className="row aic" style={{ width: '80%', marginBottom: '1%' }}>
                  <p style={{ paddingLeft: '6%', paddingRight: '3%', color: _?.color ?? 'black', fontWeight: '600' }}>
                    {_.buildingName}
                  </p>
                  <div
                    style={{
                      height: '10pt',
                      width: `${5 * (_.ticketCount ?? 0)}pt`,
                      maxWidth: '5%',
                      maxWidth: '50%',
                      backgroundColor: _.color ?? 'black',
                      borderRadius: '20px',
                      paddingLeft: '6%',
                    }}
                  />
                  <p style={{ paddingLeft: '3%', fontSize: '16px', color: _.color ?? 'black' }}>{_.ticketCount ?? 0}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </UXL>
  );
}

function HeaderListTile(props) {
  return (
    <div className="row aic header_list_tile_container">
      <div className="column tickets_percentage">
        <p
          style={{
            fontSize: props?.width < 400 ? '10px' : '14px',
            fontWeight: '600',
            color: props.color,
          }}
        >
          {props.title}
        </p>
        <p
          style={{
            fontSize: props?.width < 400 ? '6px' : '12px',
            color: props.color,
          }}
        >
          {props.description}
        </p>
      </div>
      <div style={{ position: 'relative' }}>
        <img
          src={props.background}
          style={{
            position: 'absolute',
            height: '60pt',
            width: '100pt',
            left: '-100pt',
            bottom: '-30pt',
          }}
        />
        <p
          style={{
            position: 'absolute',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            left: '-60pt',
            bottom: '-8pt',
          }}
        >
          {props.count}
        </p>
      </div>
    </div>
  );
}

export default StatisticsScreen;
