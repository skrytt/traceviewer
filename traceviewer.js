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
  window.rowcontainer = new Vue({
    el: '#rowcontainer',
    data: {
      zoom: 1,
      rows: [
      ]
    },
    computed: {
      rows_formatted: function () {
        var result = [];
        var zoom = this.zoom;

        this.rows.forEach(function(row) {
          var start_percent = Math.floor(row.start * zoom);
          var duration_percent = Math.floor(row.duration * zoom);
          var end_percent = start_percent + duration_percent;

          // Remove invisible width from the start
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

          var start_time_str = `${row.start.toPrecision(3)}s`
          var duration_time_str = `${row.duration.toPrecision(3)}s`
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

  function handleFileSelect(evt) {
    // TODO improve this
    var reader = new FileReader();
    var fileToRead = evt.target.files[0];

    reader.addEventListener("loadend", function() {
      var rows = JSON.parse(reader.result);
      window.rowcontainer.rows = rows;
    });

    reader.readAsText(fileToRead);
  }
  document.getElementById('file-select-input').addEventListener('change', handleFileSelect, false);
})

