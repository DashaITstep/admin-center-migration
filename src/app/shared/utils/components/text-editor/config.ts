export const quilModules = {
  'emoji-toolbar': {
    // MDI emojicon instead of default icon
    buttonIcon: '<svg class="i" viewBox="0 0 24 24"><use href="#emoticon-happy"></use></svg>',
  },
  'emoji-textarea': false,
  'emoji-shortname': true,
  keyboard: {
    bindings: {
      tab: false,
      handleEnter: {
        key: 9,
        handler() {
          // Do nothing
        },
      },
    },
  },
  clipboard: {
    matchers: [
      [
        Node.ELEMENT_NODE,
        (node: any, delta: any) => {
          delta.forEach((e: any) => {
            if (e.attributes) {
              delete e.attributes.color;
              delete e.attributes.background;
            }
          });
          return delta;
        },
      ],
    ],
  },
};
