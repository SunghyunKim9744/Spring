<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="page" value = "${param.p}" />
<c:if test="${empty param.p}">
   <c:set var="page" value = "1" />
</c:if>
		<main class="main">
			<h2 class="main title">공지사항</h2>
			
			<div class="breadcrumb">
				<h3 class="hidden">경로</h3>
				<ul>
					<li>home</li>
					<li>고객센터</li>
					<li>공지사항</li>
				</ul>
			</div>
			<%-- <c:set var="offset" value="${(page-1)%5}"/>
			<c:set var = "startNum" value="${page-offset}"/>
			<div>
				offset : ${offset}<br>
				startNum : ${startNum}
			</div> --%>
			<div class="search-form margin-top first align-right">
				<h3 class="hidden">공지사항 검색폼</h3>
				<form class="table-form">
					<fieldset>
						<legend class="hidden">공지사항 검색 필드</legend>
						<label class="hidden">검색분류</label>
						<select name="f">
							<option  value="title">제목</option>
							<option  value="writer_Id">작성자</option>
						</select> 
						<label class="hidden">검색어</label>
						<input type="text" name="q" value="${param.q}"/>
						<input class="btn btn-search" type="submit" value="검색" />
					</fieldset>
				</form>
			</div>
			
			<div class="notice margin-top">
				<h3 class="hidden">공지사항 목록</h3>
				<table class="table">
					<thead>
						<tr>
							<th class="w60">번호</th>
							<th class="expand">제목</th>
							<th class="w100">작성자</th>
							<th class="w100">작성일</th>
							<th class="w60">조회수</th>
						</tr>
					</thead>
					<tbody>
							
					<c:forEach var="n" items="${list}">
					<tr>
						<td>${n.id}</td>
						<td class="title indent text-align-left"><a href="${n.id}">${n.title}</a>[${n.cmtCount}]</td>
						<td>${n.writerId}</td>
						<td>
						<fmt:formatDate value="${n.regdate}" pattern="yyyy-MM-dd"/>	
						</td>
						<td>${n.hit }</td>
					</tr>
					</c:forEach>
					
					
					</tbody>
				</table>
			</div>
			
			<%-- <c:set var="offset" value="${(page-1)%5}"/>
			<c:set var = "startNum" value="${page-offset}"/> --%>
	
			<c:set var = "startNum" value="${page-(page-1)%5}"/>
			
			<div class="indexer margin-top align-right">
				<h3 class="hidden">현재 페이지</h3>
				<div><span class="text-orange text-strong">${page}</span> / ${pageCount}pages</div>
			</div>

			<div class="margin-top align-center pager">	
		
	<div>
		
		<c:if test="${startNum>1}">
			<a href="?p=${startNum-5}&f=${param.f}&q=${param.q}"><span class="btn btn-prev">이전</span></a>
		</c:if>
		
		<c:if test="${startNum<=1}">
			<span class="btn btn-prev" onclick="alert('이전 페이지가 없습니다.');">이전</span>
		</c:if>
		
		
		
	</div>
	<ul class="-list- center">
	<c:forEach var="i" begin="0" end="4" varStatus="st">
		<c:set var="current" value=""/>
		<c:if test="${i+startNum == page}">
			<c:set var="current" value="orange bold"/>
		</c:if>
		
		<c:if test="${i+startNum <= pageCount}">
			<li><span class="-text- ${current}"><a href="?p=${i+startNum}&f=${param.f}&q=${param.q}" >${i+startNum}</a></span></li>
		</c:if>
	</c:forEach>	
	</ul>
	<div>
		
		<c:if test="${startNum+5 <=pageCount}">
			<a href="?p=${startNum+5}&f=${param.f}&q=${param.q}"><span class="btn btn-next">다음</span></a>
		</c:if>
		
		<c:if test="${startNum+5>pageCount}">
			<span class="btn btn-next" onclick="alert('다음 페이지가 없습니다.');">다음</span>
		</c:if>
		
	</div>
	
			</div>
		</main>