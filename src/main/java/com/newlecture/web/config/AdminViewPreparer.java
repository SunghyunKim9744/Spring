package com.newlecture.web.config;

import java.util.List;
import java.util.Map;

import org.apache.tiles.AttributeContext;
import org.apache.tiles.preparer.ViewPreparer;
import org.apache.tiles.request.Request;
import org.springframework.beans.factory.annotation.Autowired;

import com.newlecture.web.entity.Notice;
import com.newlecture.web.service.NoticeService;

public class AdminViewPreparer implements ViewPreparer{

	@Autowired
	private NoticeService noticeService;
	
	@Override
	public void execute(Request tilesContext, AttributeContext attributeContext) {

		List<Notice> list = noticeService.getList(1, 5, "title", "");
		
		Map<String, Object> model = tilesContext.getContext("request");
		model.put("asideList",list);
		
	
		
		
	}

}
