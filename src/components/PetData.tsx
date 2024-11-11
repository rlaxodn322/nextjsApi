import { SetStateAction, useEffect, useState } from 'react';
import { fetchPetData1 } from '../apis/pet';
import { useRecoilState } from 'recoil';
import { petState } from '../recoil/atoms/state';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
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

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CardGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px;
`;
const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const CloseButton = styled.button`
  background: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;
const PetData = () => {
  const [data, setData] = useRecoilState(petState);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [numOfRows, setNumOfRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // 오류 상태 추가
  const [selectedRegion, setSelectedRegion] = useState<string>('6110000'); // 선택된 지역 상태 추가
  const regions = [
    { name: '서울특별시', code: '6110000' },
    { name: '부산광역시', code: '6260000' },
    { name: '대구광역시', code: '6270000' },
  ];

  useEffect(() => {
    const fetchData1 = async () => {
      setLoading(true);
      setError(null); // 오류 상태 초기화
      try {
        const petData: any = await fetchPetData1(numOfRows, selectedRegion);
        setData(petData);
      } catch (error) {
        setError('데이터를 가져오는 데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchData1();
  }, [setData, numOfRows, selectedRegion]);

  const handleButtonClick = (rows: number) => {
    if (!loading) {
      setNumOfRows(rows);
    }
  };

  const handleRegionClick = (regionCode: string) => {
    setSelectedRegion(regionCode);
  };

  const openModal = (pet: any) => {
    setSelectedPet(pet);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((pet: any) =>
    pet.careNm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Title>유기견 위치 안내</Title>
      <ButtonGroup>
        {regions.map((region) => (
          <button
            key={region.code}
            onClick={() => handleRegionClick(region.code)}
            style={{
              backgroundColor:
                selectedRegion === region.code ? '#007BFF' : '#FFF',
              color: selectedRegion === region.code ? '#FFF' : '#333',
            }}
          >
            {region.name}
          </button>
        ))}
      </ButtonGroup>

      <SearchBar>
        <Input
          type="text"
          placeholder="보호소 이름으로 검색"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchBar>

      <ButtonGroup>
        <button onClick={() => handleButtonClick(10)} disabled={loading}>
          10개 보기
        </button>
        <button onClick={() => handleButtonClick(100)} disabled={loading}>
          100개 보기
        </button>
        <button onClick={() => handleButtonClick(1000)} disabled={loading}>
          1000개 보기
        </button>
      </ButtonGroup>

      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CardGrid>
          {filteredData.map((pet, index) => (
            <Card key={index} onClick={() => openModal(pet)}>
              <CardImage src={pet.popfile} alt={pet.kindCd} />
              <p>색상: {pet.colorCd}</p>
              <p>성별: {pet.sexCd}</p>
              <p>특징: {pet.specialMark}</p>
            </Card>
          ))}
        </CardGrid>
      )}

      {modalIsOpen && (
        <ModalOverlay>
          <ModalContent>
            {selectedPet && (
              <div>
                <h2>{selectedPet.kindCd}</h2>
                <img
                  src={selectedPet.popfile}
                  alt={selectedPet.kindCd}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <p>색상: {selectedPet.colorCd}</p>
                <p>성별: {selectedPet.sexCd}</p>
                <p>특징: {selectedPet.specialMark}</p>
                <p>발견 장소: {selectedPet.happenPlace}</p>
                <p>보호센터: {selectedPet.careNm}</p>
                <p>연락처: {selectedPet.careTel}</p>
                <p>주소: {selectedPet.careAddr}</p>
                <CloseButton onClick={closeModal}>닫기</CloseButton>
              </div>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default PetData;
