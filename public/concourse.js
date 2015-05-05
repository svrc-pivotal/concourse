var concourse={};$(".js-expandable").on("click",function(){$(this).parent().hasClass("expanded")?$(this).parent().removeClass("expanded"):$(this).parent().addClass("expanded")}),concourse.Build=function(e){this.$el=e,this.$abortBtn=this.$el.find(".js-abortBuild"),this.buildID=this.$el.data("build-id"),this.abortEndpoint="/api/v1/builds/"+this.buildID+"/abort"},concourse.Build.prototype.bindEvents=function(){var e=this;this.$abortBtn.on("click",function(n){e.abort()})},concourse.Build.prototype.abort=function(){var e=this;$.ajax({method:"POST",url:e.abortEndpoint}).done(function(n,s){e.$abortBtn.remove()}).error(function(n){e.$abortBtn.addClass("errored")})},$(function(){if($(".js-build").length){var e=new concourse.Build($(".js-build"));e.bindEvents()}}),concourse.Job=function(e){this.$el=e,this.pauseBtn=this.$el.find(".js-pauseJobCheck").pausePlayBtn(),this.jobName=this.$el.data("job-name"),this.pauseEndpoint="/api/v1/pipelines/"+window.pipelineName+"/jobs/"+this.jobName+"/pause",this.unPauseEndpoint="/api/v1/pipelines/"+window.pipelineName+"/jobs/"+this.jobName+"/unpause"},concourse.Job.prototype.bindEvents=function(){var e=this;e.$el.delegate(".js-pauseJobCheck.disabled","click",function(n){e.pause()}),e.$el.delegate(".js-pauseJobCheck.enabled","click",function(n){e.unpause()})},concourse.Job.prototype.pause=function(e){var n=this;n.pauseBtn.loading(),$.ajax({method:"PUT",url:n.pauseEndpoint}).done(function(e,s){n.pauseBtn.enable()}).error(function(e){n.pauseBtn.error()})},concourse.Job.prototype.unpause=function(e){var n=this;n.pauseBtn.loading(),$.ajax({method:"PUT",url:this.unPauseEndpoint}).done(function(e){n.pauseBtn.disable()}).error(function(e){n.pauseBtn.error()})},$(function(){if($(".js-job").length){var e=new concourse.Job($(".js-job"));e.bindEvents()}}),concourse.PauseUnpause=function(e,n,s){this.$el=e,this.pauseCallback=n,this.unpauseCallback=s,this.pauseBtn=this.$el.find(".js-pauseUnpause").pausePlayBtn(),this.pauseEndpoint="/api/v1/"+this.$el.data("endpoint")+"/pause",this.unPauseEndpoint="/api/v1/"+this.$el.data("endpoint")+"/unpause"},concourse.PauseUnpause.prototype.bindEvents=function(){var e=this;e.$el.delegate(".js-pauseUnpause.disabled","click",function(n){e.pause()}),e.$el.delegate(".js-pauseUnpause.enabled","click",function(n){e.unpause()})},concourse.PauseUnpause.prototype.pause=function(e){var n=this;n.pauseBtn.loading(),$.ajax({method:"PUT",url:n.pauseEndpoint}).done(function(e,s){n.pauseBtn.enable(),n.pauseCallback()}).error(function(e){n.pauseBtn.error()})},concourse.PauseUnpause.prototype.unpause=function(e){var n=this;n.pauseBtn.loading(),$.ajax({method:"PUT",url:this.unPauseEndpoint}).done(function(e){n.pauseBtn.disable(),n.unpauseCallback()}).error(function(e){n.pauseBtn.error()})},concourse.PipelinesNav=function(e){this.$el=$(e),this.$toggle=e.find($(".js-pipelinesNav-toggle")),this.$list=e.find($(".js-pipelinesNav-list")),this.pipelinesEndpoint="/api/v1/pipelines"},concourse.PipelinesNav.prototype.bindEvents=function(){var e=this;e.$toggle.on("click",function(){e.toggle()}),e.loadPipelines()},concourse.PipelinesNav.prototype.toggle=function(){$("body").toggleClass("pipelinesNav-visible")},concourse.PipelinesNav.prototype.loadPipelines=function(){var e=this;$.ajax({method:"GET",url:e.pipelinesEndpoint}).done(function(n,s){$(n).each(function(n,s){var a=$("<li>"),i=s.paused?"enabled":"disabled",o=s.paused?"play":"pause";a.html('<span class="btn-pause fl '+i+' js-pauseUnpause"><i class="fa fa-fw fa-'+o+'"></i></span><a href="'+s.url+'">'+s.name+"</a>"),a.data("endpoint","pipelines/"+s.name),a.data("pipelineName",s.name),a.addClass("clearfix"),e.$list.append(a),e.newPauseUnpause(a),window.pipelineName===s.name&&s.paused&&e.$el.find(".js-groups").addClass("paused")})})},concourse.PipelinesNav.prototype.newPauseUnpause=function(e){var n=this,s=new concourse.PauseUnpause(e,function(){e.data("pipelineName")===window.pipelineName&&n.$el.find(".js-groups").addClass("paused")},function(){e.data("pipelineName")===window.pipelineName&&n.$el.find(".js-groups").removeClass("paused")});s.bindEvents()},$(function(){if($(".js-pipelinesNav").length){var e=new concourse.PipelinesNav($(".js-pipelinesNav"));e.bindEvents()}}),concourse.Resource=function(e){this.$el=e,this.pauseBtn=this.$el.find(".js-pauseResourceCheck").pausePlayBtn(),this.resourceName=this.$el.data("resource-name"),this.pauseEndpoint="/api/v1/pipelines/"+window.pipelineName+"/resources/"+this.resourceName+"/pause",this.unPauseEndpoint="/api/v1/pipelines/"+window.pipelineName+"/resources/"+this.resourceName+"/unpause"},concourse.Resource.prototype.bindEvents=function(){var e=this;e.$el.delegate(".js-pauseResourceCheck.disabled","click",function(n){e.pause()}),e.$el.delegate(".js-pauseResourceCheck.enabled","click",function(n){e.unpause()})},concourse.Resource.prototype.pause=function(e){var n=this;n.pauseBtn.loading(),$.ajax({method:"PUT",url:n.pauseEndpoint}).done(function(e,s){n.pauseBtn.enable(),n.$el.find(".js-resourceStatusText").html("checking paused")}).error(function(e){n.pauseBtn.error()})},concourse.Resource.prototype.unpause=function(e){var n=this;n.pauseBtn.loading(),$.ajax({method:"PUT",url:this.unPauseEndpoint}).done(function(e){n.pauseBtn.disable(),n.$el.find(".js-resourceStatusText").html("checking successfully")}).error(function(e){n.pauseBtn.error()})},$(function(){if($(".js-resource").length){var e=new concourse.Resource($(".js-resource"));e.bindEvents()}}),function(e){e.fn.pausePlayBtn=function(){var n=e(this);return{loading:function(){n.removeClass("disabled enabled").addClass("loading"),n.find("i").removeClass("fa-pause").addClass("fa-circle-o-notch fa-spin")},enable:function(){n.removeClass("loading").addClass("enabled"),n.find("i").removeClass("fa-circle-o-notch fa-spin").addClass("fa-play")},error:function(){n.removeClass("loading").addClass("errored"),n.find("i").removeClass("fa-circle-o-notch fa-spin").addClass("fa-pause")},disable:function(){n.removeClass("loading").addClass("disabled"),n.find("i").removeClass("fa-circle-o-notch fa-spin").addClass("fa-pause")}}}}(jQuery);