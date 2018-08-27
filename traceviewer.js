Vue.component('viewer-row', {
  props: ['label', 'start', 'duration', 'duration_time'],
  template: `
    <div class="viewer-row viewer-data-row">
      <span class="viewer-row-entry viewer-row-label">{{label}}</span>
      <span class="viewer-row-entry viewer-data-row-span-container">
        <span class="viewer-data-row-duration" v-bind:style="{'margin-left': start, width: duration}">
          {{duration_time}}
        </span>
      </span>
    </div>
  `
})

window.addEventListener('load', function() {
  window.app = new Vue({
    el: '#rowcontainer',
    data: {
      zoom: 1,
      rows: [
        { id: 1, label: 'Foo', start:  0.0, duration: 40.0 },
        { id: 2, label: 'Bar', start: 20.0, duration: 20.0 },
        { id: 3, label: 'Baz', start: 40.0, duration: 50.0 }
      ]
    },
    computed: {
      rows_formatted: function () {
        result = [];
        zoom = this.zoom;

        this.rows.forEach(function(row) {
          start_percent = Math.floor(row.start * zoom);
          duration_percent = Math.floor(row.duration * zoom);

          // Remove invisible width from the start
          end_percent = start_percent + duration_percent;
          if (end_percent < 0) {
            start_percent = 0;
            duration_percent = 0;
          }
          if (start_percent < 0) {
            duration_percent += start_percent;
            start_percent = 0;
          }

          // Remove invisible width from the end
          if (start_percent > 100) {
            start_percent = 100;
            duration_percent = 0;
          }
          if (end_percent > 100) {
            duration_percent -= (end_percent - 100);
          }

          start_time_str = `${row.start.toPrecision(3)}s`
          duration_time_str = `${row.duration.toPrecision(3)}s`
          result.push({
            id: row.id,
            label: row.label,
            duration_time_str: duration_time_str,
            start_percent_str: `${start_percent}%`,
            duration_percent_str: `${duration_percent}%`,
            title: `label: ${row.label}\r\nstart: ${start_time_str}\r\nduration: ${duration_time_str}`
          })
        });

        return result;
      }
    }
  });
})
