# forest_adventure

## Local Install Instructions:
- Run npm install
- Run npm start

While working through Zenva's Phaser 3 bootcamp, I was dissatisfied with the shooting controls in the top-down RPG unit. I challenged myself to improve on it.

The original control scheme utilized the spacebar for firing, and would fire a projectile in whichever direction the player sprite had last been moving: for instance, if the player had been moving south on the map, pressing the spacebar would then fire a projectile southward. This is fine, if your enemy is right ahead of you.

But what if you've been traveling south, and your enemy is positioned to your left? You would need to first move left before you could fire in that direction. Not very user-friendly, especially if an enemy sneaks up on you and you must fire upon it quickly.

My refactoring of the controls untethers projectile direction from player direction: using the WASD keys, the player can navigate the map while firing in any of the four cardinal direction at any time. Enemy sneaking up behind you? No problem.

[Check it out on Heroku](https://forestadventures.herokuapp.com/)
