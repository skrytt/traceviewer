Vue.component('viewer-row', {
  props: ['label', 'start', 'duration'],
  template: `
    <div class="viewer-data-row">
      <span class="viewer-row-entry viewer-row-label">{{label}}</span>
      <span class="viewer-row-entry viewer-data-row-start-delay" v-bind:style="{width: start}"></span>
      <span class="viewer-row-entry viewer-data-row-duration" v-bind:style="{width: duration}"></span>
    </div>
  `
})

window.addEventListener('load', function() {
  var app = new Vue({
    el: '#viewer-row-container',
    data: {
      rows: [
        { id: 1, label: 'Foo', start: "0px", duration: "50px" },
        { id: 2, label: 'Bar', start: "20px", duration: "40px" },
        { id: 3, label: 'Baz', start: "40px", duration: "60px" }
      ]
    }
  });
})
