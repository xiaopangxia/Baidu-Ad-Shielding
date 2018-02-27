//注入页面的脚本文件
/**
 * Created by 章阿龙 on 2016/5/2.
 */

;
$(function() {

	var clearAd = {
		//由于manifest文件匹配规则只有通配没有非功能，所以可在此处添加不想删除广告的页面
		checkUrl: function() {
			var Checkflag = 0,
				url = window.location.href;

			//手动添加不需要清除广告的域
			var notDel = [
				"taobao.com",
				"tmall.com",
				"jd.com"
			];

			//正则匹配
			for (var i = 0; i < notDel.length; i++) {
				var reg = new RegExp(notDel[i], "g");

				if (reg.test(url)) {
					console.log('This page does not clear ads.');
					break;
				} else {
					if (i == notDel.length - 1) {
						Checkflag = 1;
					}
				}
			}
			
			if (Checkflag == 1) {
				this.clear();
			}
		},
		clear: function() {
			console.log('Clear Start');
			//此处可手动添加广告框id名，去除顽疾ad必备
			var ad_id_name = [
				"ec_im_container",
				"content_right",
			];
			for(var i = 1; i<=8;i++)
			{
				for(var j=0;j<=10;j++)
				{
					var id_no = i*1000+j;
					ad_id_name.push(id_no.toString());
				}
			}
			var arrAll = document.all;
			for (var i = 0; i < ad_id_name.length; i++) {
				//使用remove删除节点
				$('#' + ad_id_name[i]).remove();
			}

			//清除百度图片中的推广
			var ad_css_name = [
				"fcImgli"
			];
			for (var i = 0; i < ad_css_name.length; i++) {
				$('.' + ad_css_name[i]).remove();
			}
		},
		init: function() {
			this.checkUrl();
		}
	}

	$(document).ready(function() {
		clearAd.init();

		//为防止ajax异步延时加载的广告隔4s再清除一次
		setInterval(function() {
			clearAd.init();
		}, 4000)
	});
})