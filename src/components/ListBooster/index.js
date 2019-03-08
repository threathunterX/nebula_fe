class ListBooster {

  // 检查首个元素是否已经移出容器
  static checkIsOut(target, scrollTop) {
    const targetBottom = target.offsetTop + target.clientHeight;
    return targetBottom > scrollTop;
  }

  // 检查最后一个元素是否已经移出容器
  static checkIsIn(target, scrollTop) {
    return target.offsetTop >= scrollTop;
  }

  constructor(listCont, child, limit) {
    this.list = [];
    this.startEleIndex = 0;
    const listContainer = listCont;

    listContainer.onscroll = (e) => {
      const prerfix = listContainer.querySelector(child);

      this.addBottomData(prerfix, limit, e);

      this.addTopData(prerfix, e);
    };

    // 初始化
    this.boostInit(listContainer, child, limit);
  }

  // 删除顶部元素，添加底部元素
  addBottomData(prerfixTemp, limit, e) {
    const prerfix = prerfixTemp;
    prerfix.style.display = '';
    // 首个元素移出容器，则删除首个元素，并在列表最后添加下一个元素
    for (; ;) {
      const firstChild = prerfix.nextSibling;

      if (!((ListBooster.checkIsOut(firstChild, e.target.scrollTop) === false) &&
        (this.startEleIndex + limit < this.list.length))
      ) {
        if (this.startEleIndex === 0) {
          prerfix.style.height = 0;
        }
        break;
      }

      prerfix.style.height = `${prerfix.clientHeight + firstChild.clientHeight}px`;
      firstChild.parentElement.appendChild(this.list[this.startEleIndex + limit]);
      firstChild.remove();
      this.startEleIndex += 1;
    }
  }

  // 添加顶部元素，删除底部元素
  addTopData(prerfixTemp, e) {
    const prerfix = prerfixTemp;
    prerfix.style.display = '';
    // 首个元素移入容器，则在首部添加元素，并删除底部元素
    for (; ;) {
      const firstChild = prerfix.nextSibling;
      const lastChild = prerfix.parentElement.lastChild;

      if (!((ListBooster.checkIsIn(firstChild, e.target.scrollTop)) && (this.startEleIndex > 0))) {
        if (this.startEleIndex === 0) {
          prerfix.style.display = 'none';
        }
        break;
      }

      this.startEleIndex -= 1;
      lastChild.parentElement.insertBefore(this.list[this.startEleIndex], prerfix.nextSibling);
      prerfix.style.height = `${prerfix.clientHeight - prerfix.nextSibling.clientHeight}px`;
      lastChild.remove();
    }
  }

  // 列表初始化
  boostInit(listContainer, child, limit) {
    const parent = listContainer.querySelector(child).parentElement;

    const listChild = listContainer.querySelectorAll(child);
    listChild.forEach((v, i) => {
      const item = listChild[i];
      this.list.push(item);
      item.remove();
    });

    const listEles = document.createDocumentFragment();
    const firstChild = this.list[0].cloneNode(true);
    firstChild.style.height = 0;
    firstChild.style.display = 'none';
    listEles.appendChild(firstChild);
    for (let i = 0; i < limit; i += 1) {
      listEles.appendChild(this.list[i]);
    }
    parent.appendChild(listEles);
  }
}

export default ListBooster;
