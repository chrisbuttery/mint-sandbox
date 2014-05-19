mint-sandbox
============

A very crude example of swapping out different JSON files and jamming it into data-binding.

## Get Started

Create a local site named: `http://local.mint-sandbox.com`.

1. Run 'component install' to pull down all the awesome dependencies.
2. Run 'component build' to bundle these up into a juicy script.


### But I dont want to call my local site that

If you need to create a different address for this local site, make sure the paths are
updated in the following scripts.

```
local/router/index.js
local/translate/index.js
```

Then from the root of this directory run `component build`

### Make some changes

If you wish to update any scripts, just run `component build` after to ensure your changes
were added to the `build/build.js` file.

This doesnt apply to HTML or CSS.

### proof of concept

Thats all this example is. I'm aware the router is a bit dodgy and some of the script is messier than
Joaquin Phoenix's beard.