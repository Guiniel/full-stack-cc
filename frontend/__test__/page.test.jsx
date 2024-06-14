import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '@/app/page';
describe('Home component', () => {
    it('contains the specific text', () => {
      const html = renderToString(<Home />);
      expect(html).toContain('Escoge una canción para mas detalles');
    });
  });