<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
            <main>
                <h2 class="main title">공지사항</h2>

                <div class="breadcrumb">
                    <h3 class="hidden">breadlet</h3>
                    <ul>
                        <li>home</li>
                        <li>고객센터</li>
                        <li>공지사항</li>
                    </ul>
                </div>

                <div class="margin-top first">
                    <h3 class="hidden">공지사항 내용</h3>
                    <table class="table">
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td class="text-align-left text-indent text-strong text-orange" colspan="3">
                                 	${n.title}
                                 </td>
                            </tr>
                            <tr>
                                <th>작성일</th>
                                <td class="text-align-left text-indent" colspan="3">
                                	 <fmt:formatDate value="${n.regdate}" pattern="yyyy-MM-dd"/>
                                </td>
                            </tr>
                            <tr>
                                <th>작성자</th>
                                <td>${n.writerId}</td>
                                <th>조회수</th>
                                <td>${n.hit}</td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td colspan="3"></td>
                            </tr>
                            <tr class="content">
                                <td colspan="4">
                                ${n.content}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="margin-top text-align-center">
                    <a class="btn-text btn-cancel" href="list">목록</a>
                    <a class="btn-text btn-default" href="${n.id}/edit">수정</a>
                    <a class="btn-text btn-default btn-del" href="${n.id}/del">삭제</a>
                </div>

                <div class="margin-top">
                    <table class="table border-top-default">
                        <tbody>
                            <tr>
									<th>다음글</th>
									<td colspan="3"  class="text-align-left text-indent">
									<c:if test="${empty next}">
										다음글이 없습니다.
									</c:if>
									
									<c:if test="${not empty next}">
										<a class="text-blue text-strong" href="${next.id}">${next.title}</a></td>
									</c:if>
								</tr>
								
									
								
								
								<tr>
									<th>이전글</th>
									<td colspan="3"  class="text-align-left text-indent">
									<c:if test="${empty prev}">
										이전글이 없습니다.
									</c:if>
									
									<c:if test="${not empty prev}">
										<a class="text-blue text-strong" href="${prev.id}">${prev.title}</a></td>
									</c:if>
									
								</tr>
                        </tbody>
                    </table>
                </div>
            </main>
            
            
<script>
	window.addEventListener("load",()=>{
	
		let delButton = document.querySelector(".btn-del");
		delButton.onclick=(e)=>{
			let result = confirm("삭제하시겠습니까?");
			if(!result)
				e.preventDefault();
		};
	});
</script>