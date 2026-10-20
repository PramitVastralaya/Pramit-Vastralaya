/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { CategoriesSection } from './components/CategoriesSection.tsx';
import { FeaturedCollections } from './components/FeaturedCollections.tsx';
import { ShowcaseGallery } from './components/ShowcaseGallery.tsx';
import { ProductCatalog } from './components/ProductCatalog.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { AdminPortalPage } from './components/AdminPortalPage.tsx';

function MainLayout() {
  const { currentView } = useStore();

  // If the owner has opened the Admin Portal, render the dedicated restricted management view
  if (currentView === 'admin') {
    return <AdminPortalPage />;
  }

  // Otherwise render the public digital showroom & catalogue
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C201C] flex flex-col selection:bg-[#7E1C28] selection:text-white">
      {/* Navigation & Announcement Bar */}
      <Header />

      {/* Main Showroom Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* 6 Mandatory Categories Section */}
        <CategoriesSection />

        {/* Featured Collections Showcase */}
        <FeaturedCollections />

        {/* Visual Showroom Lookbook & Image Showcase Gallery */}
        <ShowcaseGallery />

        {/* Interactive Showroom Product Catalog */}
        <ProductCatalog />

        {/* About Pramit Vastralay */}
        <AboutSection />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Shop Location & Contact Information */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Product Details Modal */}
      <ProductDetailModal />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
