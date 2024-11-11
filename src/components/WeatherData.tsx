import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../apis/weather'; // API 호출 함수
import { WeatherData1 } from '@/types/Post'; // API 데이터 타입 (예: 날씨 데이터)
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
  text-align: center;
`;

const WeatherIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #34495e;
`;

const WeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData1 | null>(null); // 날씨 데이터 상태
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const formatTemperature = (temp: number) => {
    return isCelsius ? `${temp}°C` : `${(temp * 9) / 5 + 32}°F`;
  };

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
      <LoadingContainer>
        <span>날씨 데이터를 로딩 중입니다...</span>
      </LoadingContainer>
    );
  }

  const formatWeatherItem = (item: any) => {
    if (!item) return null;
    return (
      <>
        <strong>값:</strong> {item.value}
        <br />
        <strong>시간:</strong> {item.time}
        <br />
        <strong>위치:</strong> {item.location}
      </>
    );
  };

  return (
    <Container>
      <WeatherGrid>
        <WeatherCard>
          <img src="/icons/temperature.svg"></img>
          <WeatherTitle>온도</WeatherTitle>
          <WeatherDetails>
            {' '}
            {formatTemperature(weatherData.temperature.value)}{' '}
            <button onClick={toggleTemperatureUnit}>
              {' '}
              {isCelsius ? 'Switch to °F' : 'Switch to °C'}{' '}
            </button>
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <img src="/icons/humidity.svg"></img>
          <WeatherTitle>습도</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.humidity)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <img src="/icons/rain.svg"></img>
          <WeatherTitle>강수량</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.precipitation)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <img src="/icons/wind.svg"></img>
          <WeatherTitle>풍속</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.windSpeed)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <WeatherTitle>풍향</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.windDirection)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <WeatherTitle>남북바람</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.visibility)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <WeatherTitle>동서바람</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.airPressure)}
          </WeatherDetails>
        </WeatherCard>

        <WeatherCard>
          <WeatherTitle>강수 형태</WeatherTitle>
          <WeatherDetails>
            {formatWeatherItem(weatherData.weatherCode)}
          </WeatherDetails>
        </WeatherCard>
      </WeatherGrid>
    </Container>
  );
};

export default WeatherData;
