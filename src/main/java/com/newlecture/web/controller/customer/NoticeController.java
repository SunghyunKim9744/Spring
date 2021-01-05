package com.newlecture.web.controller.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.newlecture.web.entity.Notice;
import com.newlecture.web.service.NoticeService;

@Controller
@RequestMapping("/customer/notice/")
public class NoticeController {

	@Autowired
	private NoticeService noticeService;
	@RequestMapping("list")
	public String list(Model model) {
		
//		NoticeService noticeService = new NoticeService();
		List<Notice> list = noticeService.getList();
		for(Notice n : list)
			System.out.println(n);
		model.addAttribute("list", list);
//		7번째 줄에 적힌 url로 맵핑이 됨.
//		즉, /cutomer/board/notice/list.jsp
//		return "list.jsp";
		
//		return "/WEB-INF/view/customer/board/notice/list.jsp";
//		return "customer/notice/list";
//		tiles가 인식할 수 있는 이름으로 바꾸기
	    return "customer.notice.list";
	}
	
//	1. /customer/notice/detail?id=3 - > QueryString
//	2. /customer/notice/3 - > 경로
	
//		1. /customer/notice/detail?id=3 - > QueryString
	//	@RequestMapping("detail")
	//	public String detail(Model model, /* 1-2 */String id /* 1-1 HttpServletRequest request */) {
	////		1-1
	////		String id_ = request.getParamerter("id");
	//		
	////		1-2 스프링은 쿼리스트링으로 값을 보내면 같은 이름으로 받을수 있음.
	//		System.out.println(id);
	//		Notice notice = noticeService.get(Integer.parseInt(id));
	//		model.addAttribute("notice", notice);
	//		return "customer.notice.detail";
	//	}
	
//			2. /customer/notice/3 - > 경로
//			{} - > 값, @PathVariable - > 쿼리스트링이 아닌 경로의 값을 받기 위한 어노테이션 
	@RequestMapping("{id}")
	public String detail(Model model, @PathVariable String id) {

		System.out.println(id);
		Notice notice = noticeService.get(Integer.parseInt(id));
		model.addAttribute("notice", notice);
		return "customer.notice.detail";
	}

}


