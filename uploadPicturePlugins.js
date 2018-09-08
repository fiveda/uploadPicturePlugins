function uploadPicturePlugins(opt){
	this.id=opt.id;
	this.uploadArea=$('#'+this.id);
	if (!this.uploadArea) return false;
	this.name=opt.name||this.id;
	this._init();

}
uploadPicturePlugins.prototype = {   
	_init : function(){
		if (!$('.uploadAreaStyle').length)
		this.uploadArea.before(`<style class='uploadAreaStyle'>
				.UPP-item						{ float:left; postion:relative}
				.UPP-item .UPP-file				{ display:none; }
				.UPP-item.UPP-small				{ width:50px; height:50px; margin:0 10px 10px 0; }
				.UPP-item.UPP-big				{ position:absolute;width:100%; height:auto; margin:0 0 10px 0; z-index:2}
				.UPP-item .UPP-preview			{ width:100%; height:100%; display:none}
				.UPP-item .UPP-delete-btn		{ border-radius:50%;border:1px red solid; top:42px;
					width:40px; height:40px; position:relative; margin:-40px 0 0; float:right; cursor:pointer; display:none; }
				.UPP-item .UPP-delete-btn:before, 
				.UPP-item .UPP-delete-btn:after  { content:""; display:block; margin:11px 19px; width:2px; height:18px; background:red; position: absolute; transform:rotate(45deg);}\
				.UPP-item .UPP-delete-btn:after  { transform:rotate(-45deg); }
				.UPP-item.UPP-big .UPP-delete-btn	{ display:block; }
				.UPP-item .UPP-add-btn			{ float:left; width:30px; height:30px; margin:10px; border:#01c7d4 solid 1px; border-radius:2px;  }
				.UPP-item .UPP-add-btn:before, 
				.UPP-item .UPP-add-btn:after    	{ content:""; display:block; margin:6px 14px; width:2px; height:18px; background:#01c7d4; position: absolute; z-index:1}
				.UPP-item .UPP-add-btn:after    	{ transform:rotate(90deg); }
				</style>`);
	 	this.addFileInput();
		this._bindEvent();
	},
	_bindEvent : function(){
		var self = this;
		this.uploadArea.on("click",".UPP-preview",function(){
			$(this).parent().toggleClass('UPP-small UPP-big')
		});
		this.uploadArea.on("click",".UPP-add-btn",function(){
			$(this).next('input').click();
		});
		this.uploadArea.on("change","input[type='file']",function(){ 
			self.onchangeBind(this);
		});
		this.uploadArea.on("click",".UPP-delete-btn",function(){
			self.deleteFileInput(this);
		});
	},
	onchangeBind : function(obj) {
		if (checkimgtype(obj,"jpg|jpeg|png")){
			try {
		        src=getObjectURL(obj.files[0]);
		        $(obj).next('img').attr('src',src).show()
		        .siblings(".UPP-add-btn").hide();
		        this.addFileInput(obj);
		    } catch (e) {}
		}
		function checkimgtype(input,extNameList){
			var file=input.value;
			if (file.lastIndexOf('.')==-1){
		        alert("路径不正确!"); 
		        input.value=''; 
		        return false;  
		    }  
		    var extName = file.substring(file.lastIndexOf(".")+1).toLowerCase();
		    extNameList=extNameList.split('|')    
		    if(extNameList.indexOf(extName)==-1)          
		    {  
		        alert("请上传 "+extNameList+" 类型的图片，当前文件类型为"+extName);
		        input.value=''; 
		        return false;  
		    }
		    return true;
		};
		function getObjectURL(file) {
		    var url = null;
		    if (window.createObjectURL != undefined) {
		        url = window.createObjectURL(file);
		    } else if (window.URL != undefined) {
		        url = window.URL.createObjectURL(file);
		    } else if (window.webkitURL != undefined) {
		        url = window.webkitURL.createObjectURL(file);
		    }
		    return url;
		}
	},
	addFileInput : function(){
		var i=$('div',this.uploadArea).length + 1;
		var fileInput=`<div class="UPP-item UPP-small" style="">
			<div class="UPP-delete-btn"></div>
			<div class="UPP-add-btn"></div>
			<input name="${this.name+i}" id="${this.name+i}" class="${this.name} UPP-file" type="file">
			<img src="" class="${this.name}-preview UPP-preview">
			</div>`;
		this.uploadArea.append(fileInput);
	},
	deleteFileInput : function(obj){
		var index=$(obj).parent().index()+1;
		var afterInputList=$(obj).parent().nextAll();
		for (var i=0;i<afterInputList.length;i++){
			$('input',afterInputList.eq(i)).attr('id',this.name+(i+index)).attr('name',this.name+(i+index))
		}
		$(obj).parent().remove();
	}

}


