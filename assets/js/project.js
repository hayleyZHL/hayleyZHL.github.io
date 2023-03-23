var paperHandler = d3.select("#papers");
var filePath = "assets/projects/project.csv";
var highlightColor = "#334466";
d3.csv(filePath)
    .then(function(data) {
        LoadProjects(data);
    });

function LoadProjects(paperData){
    console.log(paperData);
    var papers = paperHandler.selectAll('div')
        .data(paperData)
        .enter()
        .append("div")
        .attr('class', function(d){
            if(d.public == "no")
                return "paper paper_horizontal_private";
            else
                return "paper paper_horizontal";
        });
    papers.append('div')
        .attr('class', "paper_thumb paper_thumb_right")
        .append('a')
        .attr("href", function(d) {
            if(d.website === 'none'){
                if (d.video != undefined && d.video.trim() !== 'none') {
                    return d.video.trim();
                }
                else
                    return d.paper.trim();
            }
            else{
                return d.website;
            }
        })
        .attr("target", "_blank")
        .append('img')
        .attr('class', "paperthumbnail paperthumbnail_right")
        .attr('src', function(d) {return d.thumbnail; });

    let paperInfo = papers.append('div')
        .attr('class', 'paper_info paper_info_right');

    paperInfo
        .append('a')
        .attr('class', 'paper_name')
        .text(function(d){
            return getCleanText(d.name) ;
        })
        .each(function(d){
            if (d.website != undefined && d.website.trim() !== 'none') {
                d3.select(this)
                    .attr("href", function(d) {
                        if (d.website != undefined && d.website.trim() !== 'none') {
                            return d.website.trim();
                        }
                    })
                    .attr("target", "_blank");
            }
        });

    paperInfo
        .each(function(d){
            let titleAndYear = null;
            if(d.title.length > 0){
                titleAndYear = d3.select(this).append('p');
            }
            else
                titleAndYear = d3.select(this).append('a');
            titleAndYear
                .attr('class', 'paper_info_text')
                .text(function(d){
                    if(d.title.length > 0)
                        return getCleanText(d.title)+ ". " + d.year;
                    else
                        return " " + d.year;
                })
        });

    paperInfo
        .append('p')
        .append('a')
        .attr('class', 'paper_authors')
        .text(function(d){
            let t = getCleanText(d.authors);
            let index = t.indexOf('Haijun Xia');
            return t.substr(0, index);
        })
        .append('a')
        .attr('class', 'paper_me')
        .text('Haijun Xia')
        .append('a')
        .attr('class', 'paper_authors')
        .text(function(d){
            let t = getCleanText(d.authors);
            let index = t.indexOf('Haijun Xia');
            return t.substr(index + 10, t.length - index - 10);
        });

    let paperResource = paperInfo.append("p").attr('class', 'paper_resource');
    paperResource
        .each(function(d){
            if (d.paper != undefined && d.paper.trim() !== 'none') {
                d3.select(this)
                    .append('a')
                    .attr("class", "contact_logo")
                    .attr("href", function(d) {
                        if (d.paper != undefined && d.paper.trim() !== 'none') {
                            return d.paper.trim();
                        }
                    })
                    .attr("target", "_blank")
                    .append('i')
                    .attr("class", 'fas fa-file-alt fa-1x')
                    .attr('data-fa-transform', "down-8");
            }

            if (d.video != undefined && d.video.trim() !== 'none') {
                d3.select(this)
                    .append('a')
                    .attr("class", "contact_logo")
                    .style("margin-left", '10px')
                    .attr("href", function(d) {
                        if (d.video != undefined && d.video.trim() !== 'none') {
                            return d.video.trim();
                        }
                    })
                    .attr("target", "_blank")
                    .append('i')
                    .attr("class", 'fab fa-youtube')
                    .attr('data-fa-transform', "down-10");
            }
    });

    let paperAward  = paperInfo.
    each(function(d) {
        let award = d.award.trim();
        if(award === 'HM' || award === 'BEST'){
            let resourcePara = d3.select(this)
                .append("p")
                .attr('class', 'paper_award');
            resourcePara
                .append('a')
                .attr("class", "contact_logo")
                .append('i')
                .attr("class", 'fas fa-trophy')
                .attr('data-fa-transform', "down-10");

            resourcePara
                .append('a')
                .attr('class', 'award')
                .style('margin-left', '10px')
                .text(function(d){
                    if(award === 'HM')
                        return 'Best Paper Honorable Mention';
                    else if(award === 'BEST')
                        return 'Best Paper Award'
                });
        }
    });
    ResizePage();
}

function getCleanText(t){
    if(t[0] == '\"')
        t = t.substr(1, t.length - 1);
    if(t[t.length - 1] == '\"')
        t = t.substr(0, t.length - 1);
    t = t.trim();
    return t;
}