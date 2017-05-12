$(document).ready(function ($) {
	// 模拟接口返回
	// var resp = {
	// 	code: 1,
	// 	msg: '成功',
	// 	data: [{
	// 		image: 'https://img1.doubanio.com/lpic/s29402699.jpg',
	// 		bookTitle: 'javascript 框架设计',
	// 		author: '司徒正美',
	// 		brief: '框架设计框架设计框架设计框架设计框架设计'
	// 	},
	// 	{
	// 		image: 'https://img1.doubanio.com/lpic/s29402699.jpg',
	// 		bookTitle: '高性能网站建设',
	// 		author: 'Steve Souders',
	// 		brief: '高性能网站建设高性能网站建设高性能网站建设'
	// 	},
	// 	{
	// 		image: 'https://img1.doubanio.com/lpic/s29402699.jpg',
	// 		bookTitle: 'javascript 框架设计',
	// 		author: '司徒正美',
	// 		brief: '框架设计框架设计框架设计框架设计框架设计'
	// 	},
	// 	{
	// 		image: 'https://img1.doubanio.com/lpic/s29402699.jpg',
	// 		bookTitle: '高性能网站建设',
	// 		author: 'Steve Souders',
	// 		brief: '高性能网站建设高性能网站建设高性能网站建设'
	// 	},
	// 	{
	// 		image: 'https://img1.doubanio.com/lpic/s29402699.jpg',
	// 		bookTitle: 'javascript 框架设计',
	// 		author: '司徒正美',
	// 		brief: '框架设计框架设计框架设计框架设计框架设计'
	// 	},
	// 	{
	// 		image: 'https://img1.doubanio.com/lpic/s29402699.jpg',
	// 		bookTitle: '高性能网站建设',
	// 		author: 'Steve Souders',
	// 		brief: '高性能网站建设高性能网站建设高性能网站建设'
	// 	},
	// 	{
	// 		image: 'https://img1.doubanio.com/lpic/s29402699.jpg',
	// 		bookTitle: 'javascript 框架设计',
	// 		author: '司徒正美',
	// 		brief: '框架设计框架设计框架设计框架设计框架设计'
	// 	},
	// 	{
	// 		image: 'https://img1.doubanio.com/lpic/s29402699.jpg',
	// 		bookTitle: '高性能网站建设',
	// 		author: 'Steve Souders',
	// 		brief: '高性能网站建设高性能网站建设高性能网站建设'
	// 	}]
	// }
	// 注册handlebars的if插件
	Handlebars.registerHelper('ifThird', function (index, options) {
	   if((index+1)%3==0){
	      return options.fn(this);
	   }
	});
	// var booksTemplate = Handlebars.compile($("#booksTemplate").html());
	// $('#bookList').html(booksTemplate(resp));
	function getList(condition) {
		$.ajax({
	        url: '/book/bookListData',
	        method: 'get',
	        data: condition,
	        dataType: 'json',
	        success: function (resp) {
	            if (+resp.code === 1) {
					var booksTemplate = Handlebars.compile($("#booksTemplate").html());
					$('#bookList').html(booksTemplate(resp));
	            }
	        }
	    });
	}
	$('#btnSearch').on('click', function () {
		var condition = {
			shelfType: $.trim($('#shelf-select').val()) || '',
			searchContent: $.trim($('#searchContent').val()) || ''
		};
		if (!condition.shelfType || !condition.searchContent) {
			alert('请输入图书信息或选择书架');
			return false;
		}
		getList(condition);
	});
	$('#shelf-select').selectBoxIt({
		showFirstOption: false
	}).on('open', function () {
		$(this).data('selectBoxSelectBoxIt').list.perfectScrollbar();
	});
	getList();
});