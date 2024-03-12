import * as React from "react";
import { useState } from "react";
import { Box, Button, HStack, Input, VStack, useDisclosure } from "@chakra-ui/react";
import { PlaceholderGame } from "./PlaceholderGame";
import { PlaceholderPlayer } from "./PlaceholderPlayer";
import InventoryGrid from "./InventoryGrid";
import SendItemModal from "./SendItemModal";
import FixedInventory from "./FixedInventory";


const InventoryDemo: React.FC = () => {
  const [game, setGame] = useState<PlaceholderGame>(new PlaceholderGame());
  const [lastID, setLastID] = useState<number>(game.lastID);
  const [customUsername, setCustomUsername] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number>(null);

  const addPlayer = () => {
    const newGame = new PlaceholderGame(game.players, lastID);
    const username = customUsername || `Player ${game.players.length + 1}`;
    newGame.addPlayerByUsername(username);
    setGame(newGame);
    setLastID(lastID + 1);
    setCustomUsername("");
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomUsername(event.target.value);
  };

  const removePlayer = (playerId: number) => {
    const newGame = new PlaceholderGame(
      game.players.filter((player) => player.id !== playerId),
      lastID
    );
    setGame(newGame);
  };

  const addRandomPizzaToPlayer = (playerId: number) => {
    const newGame = new PlaceholderGame(game.players, lastID);
    newGame.addRandomPizzaToPlayerIDInventory(playerId);
    setGame(newGame);
  };

  const handleSendItemClick = (playerId: number) => {
    setSelectedPlayerId(playerId);
    onOpen();
  };

  const handleEatItem = (playerId: number, itemIndex: number) => {
    const newGame = new PlaceholderGame(game.players, lastID);
    const player = newGame.getPlayerById(playerId);
    if (player && player.foodInventory.inventory.length > itemIndex && itemIndex >= 0) {
      player.foodInventory.removeAtIndex(itemIndex);
    }
    setGame(newGame);
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack>
        <Input
          placeholder="Enter custom username"
          value={customUsername}
          onChange={handleUsernameChange}
        />
        <Button onClick={addPlayer}>Add Player</Button>
      </HStack>
      {game.players.map((player) => (
        <Box key={player.id} boxShadow="md" p={4} borderRadius="md">
          <HStack justify="space-between">
            <Box>Player {player.id}: {player.username}</Box>
            <HStack>
              <Button onClick={() => addRandomPizzaToPlayer(player.id)}>
                Add Random Pizza
              </Button>
              <Button onClick={() => handleSendItemClick(player.id)}>
                Send Item
              </Button>
              <Button onClick={() => removePlayer(player.id)}>
                Remove Player
              </Button>
            </HStack>
          </HStack>
        <InventoryGrid
            playerId={player.id}
            inventory={player.foodInventory.inventory}
            onEatItem={handleEatItem}
        />
        </Box>
      ))}
      <SendItemModal
        isOpen={isOpen}
        onClose={onClose}
        game={game}
        playerId={selectedPlayerId}
      />
      {game.getPlayerById(0) && (
        <FixedInventory inventory={game.getPlayerById(0).foodInventory.inventory} />
      )}
    </VStack>
  );
};

export default InventoryDemo;