'use strict';

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

  filters: {
    questionNumber: function(value) { 
   	return value != null ? '#' + (+value + 1)  : '';
    },
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

    changeGroup: function($index) {
      this.focus = $index;
      this.randomQuestion = null;
    },

    random(n) {
      return Math.random() * n | 0;
    },

    drawLots: function() {
      var old = this.randomQuestion;
      var questions  = this.questions.length;

      if (questions > 1) 
	while (old == this.randomQuestion && questions > 1)
          this.randomQuestion = this.random(questions);
      else
	this.randomQuestion = 0;
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
