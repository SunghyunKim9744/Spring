package com.newlecture.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
	
	
//	권한 따라 접근할 수 있는 경로 설정
//	1. permitAll() ==> 누구라도 올 수 있는 페이지
//	2. hasAnyRole() ==> 어떤 권한이 있는 페이지만 갈 수 있는 페이지
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
		auth
			.inMemoryAuthentication()
			.withUser("newlec")
				.password("{noop}111")
				.roles("MEMBER","ADMIN")
			.and()
			.withUser("dragon")
				.password("111")
				.roles("MEMBER");
			
	}

}
