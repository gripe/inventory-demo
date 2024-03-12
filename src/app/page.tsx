'use client'; // this app is client-side only.

import * as React from 'react';
import { useState } from 'react';
import { ChakraProvider,
  Box, Heading,
  VStack
} from '@chakra-ui/react';

import App from './InventoryDemo'
 
export default function Root() {
    return (
    <ChakraProvider> 
      <App/>
      </ChakraProvider>)
}