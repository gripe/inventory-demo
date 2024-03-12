import * as React from "react";
import { Box, Grid, GridItem, Image, Text, Button, Flex } from "@chakra-ui/react";
import InventoryItem from "./InventoryItem";
import pizzaIcon from './assets/pizza.png';
//const pizzaIconUrl = `${process.env.PUBLIC_URL}/pizza.png`;
//const pizzaImage = <Image src="/pizza.png" alt="Pizza" />;
//<Image src={pizzaIconUrl} alt={item === null ? "pizza.png" : item.icon} boxSize="40px" />
import FixedInventory from "./FixedInventory";

interface InventoryGridProps {
    playerId: number;
    inventory: InventoryItem[];
    onEatItem: (playerId: number, itemIndex: number) => void;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ playerId, inventory, onEatItem }) => {
  return (
    <Box width="670px">
      <Text mb={2}>Player {playerId}&apos;s Inventory</Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        {inventory.map((item, index) => (
          <GridItem
            key={index}
            boxShadow="md"
            borderRadius="md"
            p={2}
            position="relative"
            _hover={{
              boxShadow: "lg",
              cursor: "pointer",
            }}
            border="1px"
            borderColor="#484848"
            borderWidth="4px"
          >
            <Flex direction="column" height="100%">
              <Flex justify="space-between" align="start">
              <Image src="/pizza.png" alt={item === null ? "pizza.png" : item.icon} boxSize="50px" />
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => onEatItem(playerId, index)}
                  alignSelf="flex-start"
                >
                  Eat
                </Button>
              </Flex>
              <Box mt={2} flexGrow={1}>
                <Text>
                  {item.type}: <Box as="span" fontWeight="bold">{item.name}</Box>
                </Text>
                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                  {item.description}
                </Text>
                <Text fontSize="xs">Value: {item.value}</Text>
              </Box>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default InventoryGrid;
