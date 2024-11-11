import { useEffect } from 'react';
import { fetchADST } from '../apis/api';
import { ApiData2 } from '@/types/Post';
import { useRecoilState } from 'recoil';
import { toiletState } from '../recoil/atoms/state';
import MapComponent from '../api/map';

const AdstData = () => {
  const [data, setData] = useRecoilState(toiletState);
  // const [data1, setData1] = useRecoilState(secondToiletState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adstData: ApiData2 = await fetchADST();
        console.log('서버에서 온 명소 데이터', adstData);

        // 필요한 데이터만 추출
        const extractedData = adstData.ADST[1].row.map((adst: any) => ({
          name: adst.NM_SM_NM,
          lat: parseFloat(adst.REFINE_WGS84_LAT),
          lng: parseFloat(adst.REFINE_WGS84_LOGT),
          address: adst.SIGUN_NM,
          tel: adst.TELNO,
          money: adst.ADDITN_INFO_NM,
        }));

        setData(extractedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setData]);
  const markerImageSrc = '/icons/sights.svg';
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '30px',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        경기도 명소
      </div>
      <div style={{ display: 'flex', margin: '0 auto' }}>
        <MapComponent toilets={data} markerImageSrc={markerImageSrc} />
      </div>
    </>
  );
};

export default AdstData;
