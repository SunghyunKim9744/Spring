package com.newlecture.web.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
	
	// 데이터베이스에서 갖고오기.
	@Autowired
	private DataSource dataSource;
	
	@Autowired
	private AuthenticationSuccessHandler successHandler;
	
	@Bean
	public AuthenticationSuccessHandler successHandler() {
		return new NewlecAuthenticationSuccessHandler();
	}
	
//	권한 따라 접근할 수 있는 경로 설정
//	1. permitAll() ==> 누구라도 올 수 있는 페이지
//	2. hasAnyRole() ==> 어떤 권한이 있는 페이지만 갈 수 있는 페이지 hasRole - > 한개 , hasAnyRole -> 여러개 중 하나
//	3. authenticated() ==>
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/member/login","/member/join").permitAll() // = > 모두 접근 가능 
				.antMatchers("/member/**").authenticated()   // /member/모든경로 = > 회원만 접근가능.
				.antMatchers("/admin/**").hasAnyRole("ADMIN") // /admin/모든경로 = > ADMIN만 접근가능.
				.and()
			.formLogin() // 우리가 만든 로그인 페이지로 가게 하기.
				.loginPage("/member/login")
				.loginProcessingUrl("/member/login") // Spring이 처리하는 로그인 url제공
				.defaultSuccessUrl("/") 			// 직접 로그인 페이지에서 로그인할 경우 가야할 경로 지정
				.successHandler(successHandler) 				// 로그인 성공시 해야할 로직(ex -> 정보갖고오기)
				.and()
			.logout()
				.logoutUrl("/member/logout") 		// Spring이 처리하는 logout url
				.logoutSuccessUrl("/index") 		// 사용자가 logout할 때 이동되는 페이지
				.invalidateHttpSession(true) 		// 사용자가 로그아웃 했을때 세션을 없애겠나
				.and()
			.csrf() 	// csrf 허용하기.
				.disable();
		
		
	}
	
//	사용자 설정하기
//	1. ldapAuthentication() = > 프로토콜(윈도우 서버에서 사용하는 데이터)
//	2. jdbcAuthentication() = > 데이터베이스
//	3. inMemoryAuthentication() = > 메모리
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		
//		사용자 2명 추가	 = > 비밀번호는 암호화가 필수
//		{noop} 암호화를 하지 않겠다
//		auth
//			.inMemoryAuthentication()
//			.withUser("newlec")
//				.password("{noop}111")
//				.roles("MEMBER","ADMIN")
//			.and()
//			.withUser("dragon")
//				.password("111")
//				.roles("MEMBER");
		
//		db에서 갖고와서 설정
//		Spring에서 원하는 사용자 정보 3가지 (컬럼명이 정해짐)
//		1. id
//		2. password
//		3. enabled = > 휴면 상태인지 아는 것. 
		auth
			.jdbcAuthentication()
			.dataSource(dataSource)	
			.usersByUsernameQuery("select uid id, pwd password, 1 enabled from Member where uid=?")	// 사용자 정보 
//			 .authoritiesByUsernameQuery("select m.uid id, r.name roleId "
//		               + "from Member m "
//		               + "   join MemberRole mr on m.id = mr.memberId "			// 권한 주기 DB에는 ROLE_ 꼭 붙여야함
//		               + " join Role r on r.id = mr.roleId where uid=?") 
			 //.authoritiesByUsernameQuery("select uid id,'ROLE_MEMBER' roleId from Member where uid=?")
			 .authoritiesByUsernameQuery("select uid id,'ROLE_ADMIN' roleId from Member where uid=?")
			.passwordEncoder(new BCryptPasswordEncoder());	// 사용자가 입력한 암호를 암호화
			
	}

}
