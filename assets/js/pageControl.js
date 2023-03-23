var pageWidth = 950;
function ResizePage(){
    let windowWidth = self.frameElement ? 950 : innerWidth;
    if(windowWidth > 950){
        pageWidth = 950;
    }
    else{
        pageWidth = 400;
    }

    if(windowWidth < 400)
        pageWidth = windowWidth * 0.9;

    let pageElements = d3.selectAll('.center');
    pageElements.style("width", pageWidth + "px");
    let projects = d3.selectAll('.project');
    let projectInfos =  d3.selectAll('.project_info');
    let projectThumbs = d3.selectAll('.project_thumb');
    let imageThumbs = d3.selectAll('.projectthumbnail');
    if(pageWidth>= 950){
        projects.attr('class', function(d){
                return "project project_horizontal";
        });
        projectInfos.attr('class', "project_info project_info_right");
        projectThumbs.attr('class', "project_thumb project_thumb_right");
        imageThumbs.attr('class', "projectthumbnail projectthumbnail_right");

        d3.select('#bio_left').attr("class","bio_left_horizontal");
        d3.select('#bio_right').attr("class","bio_right_horizontal");
        d3.selectAll('.bio_text').attr("class","bio_text bio_text_horizontal");
        d3.selectAll('.project_heading').attr("class", "project_heading project_heading_horizontal");
    }
    else{
        projects.attr('class', "project project_vertical");
        projectInfos.attr('class', "project_info project_info_bottom");
        projectThumbs.attr('class', "project_thumb project_thumb_bottom");
        imageThumbs.attr('class', "projectthumbnail projectthumbnail_bottom");
        d3.select('#bio_left').attr("class","bio_left_vertical");
        d3.select('#bio_right').attr("class","bio_right_vertical");
        d3.selectAll('.bio_text').attr("class","bio_text bio_text_vertical");
        d3.selectAll('.projecct_heading').attr("class", "project_heading project_heading_vertical");
    }
    console.log(pageWidth);
}