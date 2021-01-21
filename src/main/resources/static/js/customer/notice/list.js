// NoticeList 컴포넌트

class NoticeList extends React.Component {

	constructor() {
		super();
	}

	render() {
		return <main class="main">
			<h2 class="main title">공지사항</h2>

			<div class="breadcrumb">
				<h3 class="hidden">경로</h3>
				<ul>
					<li>home</li>
					<li>고객센터</li>
					<li>공지사항</li>
				</ul>
			</div>

			<div class="search-form margin-top first align-right">
				<h3 class="hidden">공지사항 검색폼</h3>
				<form class="table-form">
					<fieldset>
						<legend class="hidden">공지사항 검색 필드</legend>
						<label class="hidden">검색분류</label>
						<select name="f">
							<option value="title">제목</option>
							<option value="writer_Id">작성자</option>
						</select>
						<label class="hidden">검색어</label>
						<input type="text" name="q" value="" />
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


						<tr>
							<td></td>
							<td class="title indent text-align-left"><a href=""></a></td>
							<td></td>
							<td>

							</td>
							<td></td>
						</tr>




					</tbody>
				</table>
			</div>


			<div class="indexer margin-top align-right">
				<h3 class="hidden">현재 페이지</h3>
				<div><span class="text-orange text-strong"></span></div>
			</div>

			<div class="margin-top align-center pager">

				<div>


					<a href="?p=&f=&q="><span class="btn btn-prev">이전</span></a>


					<span class="btn btn-prev" onclick="alert('이전 페이지가 없습니다.');">이전</span>


				</div>

				<ul class="-list- center">





					<li><span class="-text- "><a href="?p=&f=&q=" ></a></span></li>


				</ul>

				<div>


					<a href="?p=&f=&q="><span class="btn btn-next">다음</span></a>

					<span class="btn btn-next" onclick="alert('다음 페이지가 없습니다.');">다음</span>

				</div>

			</div>

		</main>
	}
}

ReactDOM.render(
	<NoticeList />
	, document.querySelector("#main"));
