/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Offers } from './pages/Offers';
import { Booking } from './pages/Booking';
import { LevelTest } from './pages/LevelTest';
import { FAQ } from './pages/FAQ';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="presentation" element={<About />} />
          <Route path="offres" element={<Offers />} />
          <Route path="reservation" element={<Booking />} />
          <Route path="test-niveau" element={<LevelTest />} />
          <Route path="faq" element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
