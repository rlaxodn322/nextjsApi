'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import TitleBox from '../components/TitleBox';
import ImgBox from '../components/ImgBox';
import BlogCard from '../components/BlogCard';
import MiddleFooter from '../components/MiddleFooter';
export default function Home() {
  return (
    //<main className="flex min-h-screen flex-col items-center justify-between p-24"></main>

    <div style={{ width: '1200px', margin: '0 auto' }}>
      <TitleBox></TitleBox>
      <ImgBox></ImgBox>
      <BlogCard></BlogCard>
      <MiddleFooter></MiddleFooter>
    </div>
  );
}
