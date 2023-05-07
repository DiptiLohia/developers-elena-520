import React, { useState } from 'react';
import locationPin from './location_pin_img.jpeg';

export const Paths = () => {
    return (
      <div>
        <div className = "card">
        <img src={locationPin} alt={locationPin} />
        <h2>first path</h2>
        <p>path A B</p>
        </div>
    </div>
    );
  }
