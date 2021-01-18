package com.newlecture.web.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
/*
Spring Boot 2.x
Spring 5.x 최신 라이브러리를 이용하여 웹 개발을 하는 것이 기본
=>톰캣 설정 + Servlet/JSP+JSTL+Spring 라이브러리 + Spring dependency..
=>실행환경 + 라이브러리 + 구성하기 설정=>부트

1. 프로젝트 만들기
2. 컨트롤러 추가 => URL 매핑하는 기능을 추가 : URL 매핑 엄청 편해졌다.
             => 출력 방법이 엄청 쉬워졌다.
   (1) 매핑
   (2) 출력
   (3) 입력

 */

//@RestController -- > RESTful API에 적합, 데이터를 전달할 때
@Controller
@RequestMapping("/")
public class HomeController {

//   @RequestMapping("/admin/board/notice/list")
//   public String adminBoardNoticeList() {
//      return "list";
//   } // 방정리를 위해 분리 >> admin/board : 패키지 / notice : 클래스 / list : 함수

	@PostMapping("upload")
	@ResponseBody
	public String upload(MultipartFile file, HttpServletRequest request) throws IllegalStateException, IOException  {
		System.out.println("file uploaded");
		System.out.println(file.getOriginalFilename());
		String url = "/upload";
		String realPath = request.getServletContext().getRealPath(url);
		System.out.println(realPath);
		  
		File realPathFile = new File(realPath);
		if(!realPathFile.exists())
		     realPathFile.mkdirs();
		  
		String uploadedFilePath = realPath + File.separator + file.getOriginalFilename();
		File uploadedFile = new File(uploadedFilePath);
		file.transferTo(uploadedFile);
	  
		return "ok";
	}

	@RequestMapping("index")
	public String index() {
		return "home.index";
	}

	@RequestMapping("aaa")
	public String aaa() {
		return "aaa";
	}

	@RequestMapping("bbb")
	public String bbb() {
		return "bbb";
	}

}