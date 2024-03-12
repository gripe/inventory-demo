import React from "react";
import { Box, Image, Tooltip, HStack, Text } from "@chakra-ui/react";
import InventoryItem from "./InventoryItem"; // Adjust the import based on your project structure

interface FixedInventoryProps {
  inventory: InventoryItem[];
}

const FixedInventory: React.FC<FixedInventoryProps> = ({ inventory }) => {
  return (
    <HStack
      position="fixed"
      bottom={4}
      left={4}
      spacing={2}
      p={4}
      bgColor="whiteAlpha.800"
      boxShadow="md"
      borderRadius="md"
      width="auto"
    >
    <Text mb={1} fontSize="sm">Your Inventory:</Text>
      {Array.from({ length: 10 }).map((_, index) => {
        const item = inventory[index];
        return (
          <Tooltip
            key={index}
            label={item ? `${item.type}: ${item.name}` : "Empty Slot"}
            placement="top"
            hasArrow
          >
            <Box
              width="20px"
              height="20px"
              bg={item ? "white.100" : "gray.100"}
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {item && <Image src="/pizza.png" alt={item === null ? "pizza.png" : item.icon} boxSize="15px" />}
            </Box>
          </Tooltip>
        );
      })}
    </HStack>
  );
};

export default FixedInventory;
