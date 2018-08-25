Vue.component('viewer-row', {
  props: ['label', 'start', 'duration'],
  template: `
    <div class="viewer-data-row">
      <span class="viewer-row-entry viewer-row-label">{{label}}</span>
      <span class="viewer-row-entry viewer-data-row-start-delay" v-bind:style="{width: start}"></span>
      <span class="viewer-row-entry viewer-data-row-duration" v-bind:style="{width: duration}">{{duration}}</span>
    </div>
  `
})

window.addEventListener('load', function() {
  window.app = new Vue({
    el: '#viewerrowcontainer',
    data: {
      zoom: 1,
      rows: [
        { id: 1, label: 'Foo', start:  0.0, duration: 50.0 },
        { id: 2, label: 'Bar', start: 20.0, duration: 20.0 },
        { id: 3, label: 'Baz', start: 40.0, duration: 60.0 }
      ]
    },
    computed: {
      rows_formatted: function () {
        result = [];
        zoom = this.zoom;

        this.rows.forEach(function(row) {
          start_width_px = Math.floor(row.start * zoom);
          duration_width_px = Math.floor(row.duration * zoom);
          result.push({
            id: row.id,
            label: row.label,
            start_width: `${start_width_px}px`,
            duration_width: `${duration_width_px}px`
          })
        });

        return result;
      }
    }
  });
})
