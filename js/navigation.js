app.navigation = {
    currentPage: null,
    lastPage: null,
    goto: function(page) {
        this.lastPage = this.currentPage;
       
       $('.page').addClass('hidden');
       $('#' + page + 'Page').removeClass('hidden');
       
        this.currentPage = page;
    },
    back: function() {
        this.goto(this.lastPage)
    },
            
            
}