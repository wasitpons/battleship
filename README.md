# NodeJS BattleShip Board Game Implement

for test this app `https://gentle-forest-72838.herokuapp.com/`

## Overview
Each player deploys his ships (of lengths varying from 1 to 4 squares) secretly on a square grid. Then each player shoots at the other's grid by calling a location. The defender responds by "Hit!" or "Miss!". You try to deduce where the enemy ships are and sink them. First to do so wins.

## Type of Battleship
1 x Battleship ( 4 squares ) <br>
2 x Cruisers ( 3 squares )  <br>
3 x Destroyers ( 2 squares )  <br>
4 x Submarines ( 1 squares )  <br>

## Use Case
<img src="https://github.com/wasitpons/battleship/blob/master/asset/use-case.jpg" alt="adapt learning logo" align="center">

## API LIST
<img src="https://github.com/wasitpons/battleship/blob/master/asset/api.jpg" alt="adapt learning logo" align="center">

## HOW TO PLAY

1. Create game `/creategame` with playerName `{ playerName : <playerName> }`
2. Deploy your battleship ! `/defense` 
3. Destroy the ship ! `/attack`
4. Winner will see this message `Win! You completed the game in X moves`
