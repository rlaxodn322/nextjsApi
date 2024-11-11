import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../apis/weather'; // API 호출 함수
import { WeatherData1 } from '@/types/Post'; // API 데이터 타입 (예: 날씨 데이터)
import { useRecoilState } from 'recoil';
import { toiletState } from '../recoil/atoms/state'; // recoil 상태
import styled from 'styled-components';

// Styled-components를 사용한 스타일링
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeatherGrid = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  overflow-x: hidden; // 화면 너비를 넘어가는 요소 숨기기
  overflow-y: hidden; // 수직 스크롤 숨기기

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const WeatherCard = styled.div`
  background-color: #f7f9fc;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const WeatherTitle = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const WeatherDetails = styled.p`
  font-size: 1rem;
  color: #34495e;
  margin: 5px 0;
`;

const WeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData1 | null>(null); // 날씨 데이터 상태

  // 날씨 API 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(); // API 호출
        setWeatherData(data); // 상태에 저장
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData(); // 데이터 가져오기
  }, []);

  // 데이터가 없다면 로딩 중
  if (!weatherData) {
    return (
      <Container>
        <h2>Loading...</h2>
      </Container>
    );
  }

  const formatWeatherItem = (item: any) => {
    if (!item) return null;
    return (
      <>
        <strong>Value:</strong> {item.value}
        <br />
        <strong>Time:</strong> {item.time}
        <br />
        <strong>Location:</strong> {item.location}
      </>
    );
  };

  return (
    <Container>
      <WeatherGrid>
        <WeatherCard>
          <WeatherTitle>Temperature</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.temperature)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <WeatherTitle>Humidity</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.humidity)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <WeatherTitle>Precipitation</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.precipitation)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <WeatherTitle>Wind Speed</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.windSpeed)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <WeatherTitle>Wind Direction</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.windDirection)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <WeatherTitle>Visibility</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.visibility)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <WeatherTitle>Air Pressure</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.airPressure)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <WeatherTitle>Weather Code</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.weatherCode)}
          </WeatherDetails>
        </WeatherCard>
      </WeatherGrid>
    </Container>
  );
};

export default WeatherData;
