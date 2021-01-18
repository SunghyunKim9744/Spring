package com.newlecture.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.newlecture.web.handler.ChatWebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer{

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//		WebSocketConfig는 단지 웹 소켓 설정만 해줌. 
//		실제로 데이터가 오는 곳과 처리하는 것은 ChatWebSocketHandler
		registry.addHandler(new ChatWebSocketHandler(), "/chat");
		
	}

}
