import { Player } from './player';

export class Move {
  constructor(public x: number, public y: number, public player: Player, public value: number) {}
}
