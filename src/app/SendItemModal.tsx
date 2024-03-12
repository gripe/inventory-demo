import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { PlaceholderGame } from "./PlaceholderGame";
import { PlaceholderPlayer } from "./PlaceholderPlayer";
import FixedInventory from "./FixedInventory";


interface SendItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: PlaceholderGame;
  playerId: number;
}

const SendItemModal: React.FC<SendItemModalProps> = ({
  isOpen,
  onClose,
  game,
  playerId,
}) => {
  const [targetPlayerId, setTargetPlayerId] = React.useState<number>(null);
  const [itemIndex, setItemIndex] = React.useState<number>(null);

  const handleSendItem = () => {
    if (targetPlayerId !== null && itemIndex !== null) {
      game.giveItemToPlayerID(playerId, targetPlayerId, itemIndex);
    }
    onClose();
  };

  const player = game.getPlayerById(playerId);
  const otherPlayers = game.players.filter((p) => p.id !== playerId);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Send Item</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Target Player</FormLabel>
            <Select
              placeholder="Select a player"
              onChange={(e) => setTargetPlayerId(parseInt(e.target.value))}
            >
              {otherPlayers.map((player) => (
                <option key={player.id} value={player.id}>
                  Player {player.id} ({player.username})
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Item Index</FormLabel>
            <Select
              placeholder="Select an item"
              onChange={(e) => setItemIndex(parseInt(e.target.value))}
            >
              {player && player.foodInventory ? (
                player.foodInventory.inventory.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option value={-1} disabled>
                  No items available
                </option>
              )}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSendItem}>
            Send
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SendItemModal;