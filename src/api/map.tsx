import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapComponentProps {
  toilets: {
    money: string;
    tel: string;
    lat: number;
    lng: number;
    name: string;
    address: string | null;
  }[];
  markerImageSrc: string;
}

export default function MapComponent({
  toilets,
  markerImageSrc,
}: MapComponentProps) {
  const [map, setMap] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const initialMap = new window.kakao.maps.Map(
          document.getElementById('map'),
          {
            center: new window.kakao.maps.LatLng(
              37.201116041624736,
              127.09559941022472
            ),
            level: 10,
          }
        );
        setMap(initialMap);

        // Create marker image
        const markerImageSrcFinal = markerImageSrc || null;
        const imageSize = new window.kakao.maps.Size(20, 20); // Size of the marker image
        const imageOption = { offset: new window.kakao.maps.Point(10, 10) }; // Marker position offset

        const markerImage = new window.kakao.maps.MarkerImage(
          markerImageSrcFinal,
          imageSize,
          imageOption
        );

        // Create markers
        toilets.forEach((toilet) => {
          const markerPosition = new window.kakao.maps.LatLng(
            toilet.lat,
            toilet.lng
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage, // Set the custom image
            map: initialMap,
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style=margin:5px;font-size:10px;">
              <strong>${toilet.name}</strong>
              <br>
              <b>주소:</b> ${toilet.address || ''}<br>
              ${toilet.tel ? `<b>전화번호 : </b> ${toilet.tel}<br>` : ''}
              ${toilet.money ? `<b>전화번호 : </b> ${toilet.money}<br>` : ''}
            </div>`,
          });

          window.kakao.maps.event.addListener(marker, 'mouseover', () => {
            infowindow.open(initialMap, marker);
          });

          window.kakao.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close();
          });
        });
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI, { passive: true });

    return () => kakaoMapScript.removeEventListener('load', onLoadKakaoAPI);
  }, [toilets]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    if (lowercasedQuery === '') {
      alert('검색어를 입력해주세요.');
      return;
    }

    const foundToilet = toilets.find((toilet) => {
      const nameMatch = (toilet.name || '')
        .toLowerCase()
        .includes(lowercasedQuery);
      const addressMatch = (toilet.address || '')
        .toLowerCase()
        .includes(lowercasedQuery);
      //(toilet.name || '').toLowerCase().includes(lowercasedQuery)
      return nameMatch || addressMatch;
    });

    if (foundToilet && map) {
      const position = new window.kakao.maps.LatLng(
        foundToilet.lat,
        foundToilet.lng
      );
      map.setCenter(position);
      map.setLevel(5); // 확대 레벨을 조정할 수 있습니다. (예: 3~10)
    } else {
      alert('검색 결과가 없습니다.');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ margin: '0 auto' }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="주소로 검색"
          style={{ width: '300px', padding: '5px' }}
        />
        <button
          onClick={handleSearch}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          검색
        </button>
      </div>
      <div
        id="map"
        style={{
          borderRadius: '20px',
          width: '500px',
          height: '500px',
        }}
      ></div>
    </div>
  );
}
