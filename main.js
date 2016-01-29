Vue.filter('questionNumber', function(value) {
  return value != null ? '#' + (+value + 1)  : '';
});

var vm = new Vue({
  el: 'body',
  data: {
    newQuestion: '',
    newGroup: '',
    focus: null,
    groups: [],
    settings: false,
    randomQuestion: null,
  },

  ready: function() {
    var groupsJson = JSON.parse(localStorage.getItem('groups')) || [];

    this.groups = groupsJson;
    this.$watch('groups', this.save, { deep: true });
  },

  methods: {
    addQuestion: function() {
      console.log(this.newQuestion);
      if (this.newQuestion && this.focus != null) {
        this.questions.push(this.newQuestion);
        this.newQuestion = '';
      }
    },

    addGroup: function() {
      if (this.newGroup) {
        this.groups.push({ name: this.newGroup, questions: [] });
        this.newGroup = '';
      }
    },

    changeGroup($index) {
      this.focus = $index;
      this.randomQuestion = null;
    },

    random(n) {
      return Math.random() * n | 0;
    },

    drawLots: function() {
      let old = this.randomQuestion;

      while (old == this.randomQuestion)
        this.randomQuestion = this.random(this.questions.length);
    },

    removeGroup: function($index) {
      this.remove(this.groups, $index);
    },

    removeQuestion: function($index) {
      this.remove(this.questions, $index);
    },

    remove: function(array, $index) {
      array.splice($index, 1);
    },

    save: function() {
      var json = JSON.stringify(this.groups);

      this.groups.length && localStorage.setItem('groups', json);

      return json;
    },
  },

  computed: {
    questions: function() {
      return this.focus != null ? this.groups[this.focus].questions : [];
    },
  },
});
