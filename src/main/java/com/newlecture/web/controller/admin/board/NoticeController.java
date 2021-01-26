package com.newlecture.web.controller.admin.board;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.newlecture.web.entity.Notice;
import com.newlecture.web.entity.NoticeView;
import com.newlecture.web.service.NoticeService;

//@RestController -- > RESTful API에 적합, 데이터를 전달할 때
@Controller("adminNoticeController")
@RequestMapping("/admin/board/notice/")
public class NoticeController {
	
	@Autowired
	private NoticeService service;
	
	@GetMapping("list")
	public String list(Model model) {
		
		List<NoticeView> list = service.getViewList(1, 10,"title", "");
		model.addAttribute("list",list);
		
		Map<Integer,Boolean> pubState = new HashMap<>();
		for(NoticeView nv : list) {
			pubState.put(nv.getId(),nv.getPub());
		}
		//System.out.println(pubState);
		String jsonState = new Gson().toJson(pubState);
		//System.out.println(jsonState);
		model.addAttribute("pubStatus",jsonState);
		return "admin.board.notice.list";
	}
	
	@PostMapping("list")
	public String aa(String action, int[] del, @RequestParam("old-state") String oldState) {
		
		System.out.println(oldState);
		if(action.equals("일괄삭제")) 
			service.deleteAll(del);
		else if(action.equals("일괄공개")) {
			Map<String,Boolean> map = new Gson().fromJson(oldState,Map.class);
			map.forEach((k,v)->{
				System.out.println("k : "+k+", v : "+v);
			});
		};
			
		return "redirect:list";
	}
	
	@GetMapping("{id}")
	public String detail(@PathVariable("id") int id,Model model) {
		Notice notice = service.get(id);
		Notice prev = service.getPrev(id);
		Notice next = service.getNext(id);
		
		model.addAttribute("n", notice);
		model.addAttribute("prev", prev);
		model.addAttribute("next", next);
		
		return "admin.board.notice.detail";
	}
	
//	reg 가 get요청으로 올 때
	@GetMapping("reg")
	public String reg() {
		return "admin.board.notice.reg";
	}
	
//	reg 가 post요청으로 올 때
	@PostMapping("reg")
//	객체가 전달될 때 setter가 있을 경우 같은 이름으로 꽂아서 갖고옴. n.setTitle,content 안해도됨
//	Principal 사용자 정보를 얻을 수 있음.
	public String reg(Notice notice,Principal principal/*String title, String content*/) {
		//System.out.println(title);
		notice.setWriterId(principal.getName());
		service.insert(notice);
//		/admin/board/notice/list 컨트롤러 요청
		return "redirect:list";
	}

	@GetMapping("{id}/edit")
	public String edit(@PathVariable("id") int id,Model model) {
		
		Notice notice = service.get(id);
		
		model.addAttribute("n", notice);
	
		return "admin.board.notice.edit";
	}
	
	@PostMapping("{id}/edit")
	public String edit(Notice notice) {
		
		// 아래와 같이 하면 안됨. 입력받은 멤버들이 아닌 것들이 널로 업데이트 되기 때문에.
		//service.update(notice);
		
		int id = notice.getId();
		String title = notice.getTitle();
		String content = notice.getContent();
		
		Notice origin = service.get(id);
		origin.setTitle(title);
		origin.setContent(content);
		
		service.update(origin);
		
		return "redirect:../"+notice.getId();
	}
	
	@GetMapping("{id}/del")
	public String delete(@PathVariable("id") int id) {
		
		service.delete(id);
		return "redirect:../list";
	}
	

}
