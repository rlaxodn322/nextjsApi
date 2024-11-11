import { useEffect } from 'react';
import { fetchApiData } from '../apis/api';
import { ApiData } from '@/types/Post';
import { useRecoilState } from 'recoil';
import { toiletState } from '../recoil/atoms/state';
import MapComponent from '../api/map';
import styled from 'styled-components';

// Styled-components를 사용한 스타일링
const Container = styled.div`
  max-width: 1200px;

  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ToiletData = () => {
  const [data, setData] = useRecoilState(toiletState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const toiletData: ApiData = await fetchApiData();

        console.log('서버에서 온 화장실 데이터', toiletData);

        // 필요한 데이터만 추출
        const extractedData = toiletData.Publtolt[1].row.map((toilet: any) => ({
          address: toilet.REFINE_ROADNM_ADDR,
          lat: parseFloat(toilet.REFINE_WGS84_LAT),
          lng: parseFloat(toilet.REFINE_WGS84_LOGT),
          name: toilet.PBCTLT_PLC_NM,
        }));

        setData(extractedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setData]);

  const markerImageSrc = '/icons/toilet(1).svg';

  return (
    <Container>
      <Title>경기도 화장실 위치 안내</Title>
      <MapContainer>
        <MapComponent toilets={data} markerImageSrc={markerImageSrc} />
      </MapContainer>
    </Container>
  );
};

export default ToiletData;
