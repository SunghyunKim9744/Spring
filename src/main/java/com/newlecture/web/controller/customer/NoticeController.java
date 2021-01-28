package com.newlecture.web.controller.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.newlecture.web.entity.Notice;
import com.newlecture.web.entity.NoticeView;
import com.newlecture.web.service.NoticeService;

@Controller
@RequestMapping("/customer/notice/")
public class NoticeController {

	@Autowired
	private NoticeService service;
	
	@GetMapping("atom")
	@ResponseBody
	public String atom() {
		Notice notice = new Notice("보이지마라 트랙잭션","newlec","깨졌네 ㅠ");
		service.insert(notice);
		
		notice.setWriterId("없는사람임");
		service.insert(notice);
		return null;
		
	}
	@RequestMapping("list")
	public String list(
//			@RequestParam 을 사용하면 무조건 값을 받아야함. 해결법 - > required = false - > null을 받을 수 있음. 
			@RequestParam(name = "p", defaultValue="1") int page,
			// 기본값 설정하기
//			@RequestParam(name = "f", defaultValue="title") String field,
//			@RequestParam(name = "q", defaultValue="") String query,
//			// 기본값 안주고 MyBatis 에서 조건처리 동적 sql 만들기 
//			name과 value는 같음.
			@RequestParam(name = "f", required = false) String field,
			@RequestParam(value = "q", required = false) String query,
			Model model) {
		
		//System.out.println(page);
//		NoticeService noticeService = new NoticeService();
		int size = 10;
		List<NoticeView> list = service.getViewList(page,size,field,query);
		if(query != null && !query.equals(""))
			for(NoticeView n : list) 
				n.setTitle(n.getTitle().replace(query, "<span style=\"color:red;\">"+query+"</span>"));
	
		int count = service.getCount(field, query);
		int pageCount = (int) Math.ceil(count/(float)size);
		model.addAttribute("pageCount", pageCount);
//		for(Notice n : list)
//			System.out.println(n);
		model.addAttribute("list", list);
//		model.addAttribute("page",page);
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
	public String detail(Model model, @PathVariable Integer id) {

		//System.out.println(id);
		Notice notice = service.get(id);
		Notice prev = service.getPrev(id);
		Notice next = service.getNext(id);
		
		model.addAttribute("notice", notice);
		model.addAttribute("prev", prev);
		model.addAttribute("next", next);
		return "customer.notice.detail";
	}

}


