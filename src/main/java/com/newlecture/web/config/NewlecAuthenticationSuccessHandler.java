package com.newlecture.web.config;

import java.io.IOException;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.SavedRequest;

//@Component
public class NewlecAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler /* implements AuthenticationSuccessHandler */ {

   /*
    * @Autowired private MemberService memberService;
    */
   
   private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
      
   @Override
   public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
         Authentication authentication) throws IOException, ServletException {
      
      HttpSession session = request.getSession();
      
      System.out.println("success..");
      
      if(session != null) {
         
         User authUser = (User) SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();
         
         String uid = authUser.getUsername();
         
         // 세션에 필요한 정보를 담기
         session.setAttribute("email", "newlec@namoolab.com");
         System.out.println("handler....");
         // 사용자 포인트 등을 업데이트
         // memberService.dailyPointUpOfMember();
         // memberService.updateLastLoginTime(..);
         
         Set<String> authorities = AuthorityUtils.authorityListToSet(authentication.getAuthorities());
         /*
         1-newlec
         
         1-ROLE_ADMIN
         2-ROLE_MEMBER
         3_ROLE_TEACHER
         */
         // Member
         //  
         // MemberRole
         //
         // Role
         
         // MemberRold 테이블
         //memberId, roleId, defaultRole
         //    1          1        0
         //    1          2        1
         
         // ROLE_ADMIN, ROLE_TEACHER, ROLE_MEMBER
         
         // /member/index, /admin/index, /teacher/index
         
         SavedRequest savedRequest = (SavedRequest) session.getAttribute("SPRING_SECURITY_SAVED_REQUEST");
         if(savedRequest != null) {
            String returnURL = savedRequest.getRedirectUrl();
            redirectStrategy.sendRedirect(request, response, returnURL);
         }
         else if(authorities.contains("ROLE_ADMIN")) {
            redirectStrategy.sendRedirect(request, response, "/admin/index");
         }
         else if(authorities.contains("ROLE_TEACHER")) {
             redirectStrategy.sendRedirect(request, response, "/teacher/index");
          }
         else if(authorities.contains("ROLE_MEMBER")) {
            redirectStrategy.sendRedirect(request, response, "/member/index");
         }
         else {
            //throw new IllegalStateException();
            super.onAuthenticationSuccess(request, response, authentication);
         }
         
         
         
         // 역할별로 각자 자기 대시보드로 이동하기
         // admin -> /admin/index
         // member -> /member/index
         // user -> /index
         
      }
      
      
      
   }

}