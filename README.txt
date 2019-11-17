PROGRESS UPDATES:
    November 16th, 2019:
        Since the original submission, I've done quite a lot with my game.
        I redid my terrain code to use the P5JS noise() function, which
        produces the same smooth mountains with less computation cost, and
        allows me to generate them in such a way that I may "scroll" without
        actually translating the canvas along the x-axis. The mountains can 
        also be set to move at different rates, which improves the illusion.

        I unfortunately had to remove the noise-based cloud generation.
        The player is launched high into the air, and in order to make it
        appear like the player is moving vertically, I had to generate the
        sky statically. Generating this much sky for every frame is way too
        costly, so I removed the sky and added a height meter, which costs
        very little to render but still lets the know the player they're
        moving when they get high enough. It also is a metric I can add in
        later so players can see how high they've gone, sort of like a high
        score.

        I created two new sprites, the Bomber shell and the first frame of
        the explosion. I intend to add more explosion frames so they look
        nicer, but they take a very long time to get looking nice. The shell
        was simple to create, and I added some rotation effects to it so it
        arcs down before descending completely. I also added rotation effects
        to the player tank, so the front slants up when accelerating forwards
        or slants down when accelerating backwards.

        I added collision detection between the player and the shells, as well
        as the player and the Bomber NPCs. I added explosion sound effects
        on collision, which are kind of loud so fair warning.

        Finally, I laid a lot of the programmatic groundwork for finishing the
        game up. I still need to add the shop for purchasing upgrades, and the
        overarching driving force: fuel and time spent alive. I expect to have
        these components completed in a few hours due to the foundation laid,
        and then I can move on to adding new types of NPCs. I would also like
        to add spinning for the player, so when a shell hits the left side the
        player's tank flies up, but also rotates counterclockwise.


DOCUMENTATION:
    This game is Master Smasher, a time trial/survival type game where the
    user must survive ten minutes of high-risk, fuel-starved escaping. The
    player has stolen a top-secret government vehicle and is on the run.
    The United States government will not let their valuable tech get away
    easily. However, the tank you've stolen is the first of its kind: an 
    extremely durable, bouncy smash machine. You'll need to smash into the 
    overhead vehicles by bouncing off their bombs. With each government
    vehicle smashed, you gain funds. Every 30 seconds, you'll need a fill
    up, and it'll cost.

    Some features of this first checkpoint are enemy and player NPCs that
    are smooth. The sky also has moving clouds that coincide with the
    direction of the player's motion. The player tank has suspension that's
    bouncing up and down with the motion, and all four of its wheels spin.
    The enemy helicopters have spinner propellers.


TO RUN THIS CODE:
    - YOU MUST HAVE NODE.JS INSTALLED
    - OPEN A TERMINAL IN THIS DIRECTORY AND RUN `npm install`
    - RUN `node liveserver.js`