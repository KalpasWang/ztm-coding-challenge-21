/*
This coding challenge is all about doing a real life interview question from Google! This coding challenge only requires maximum a day's worth of work. You will also get a chance to see everyone's answer to the same 1 problem, and compare and contrast different ways to solve it! It's a tough one, but with enough concentration, you can do this!
 
 

Given a array of X number of strings, find the longest common prefix among all strings present in the array.
 
Input:
An array of different items. For example: ['pea', 'pear', 'apple', 'for', 'april', 'apendix', 'peace', 1]
 
Output:
Print the longest common prefix as a string in the given array. If no such prefix exists print "-1"(without quotes).
 
Example:
Input:
['pea', 'pear', 'apple', 'for', 'april', 'apendix', 'peace', 1]
 
Output:
['pea', 'ap']
 
Explanation:
Longest common prefix in all the given strings is 'pea'.
*/



/*
my solution use a trie data structure to build a word tree, then traverse the trie to find the prefix with maximum children number
*/
class TrieNode {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.children = {};
    this.prefixNum = 0;
    this.end = false;
  }
  
  //get the prefix word by iterating parent node
  getWord() {
    const output = [];
    let node = this;
  
    while (node !== null) {
      output.unshift(node.value);
      node = node.parent;
    }
  
    return output.join('');
  }
}
 
 

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }
  
  insert(word) {
    let node = this.root;
    const len = word.length;
    for(let i=0; i<len; i++) {
      if(!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i]);
        node.children[word[i]].parent = node;
        node.prefixNum++;
      }
      node = node.children[word[i]];
      if(i === len-1) {
        node.end = true;
        node.prefixNum++;
      }
    }
  }
}

function longestCommonPrefix(arr) {
  // filter non-string input
  const wordArr = arr.filter(el => typeof el === 'string');
  let len = wordArr.length;
  
  // create trie by words array
  const wordsTrie = new Trie();
  for(let i=0; i<len; i++) {
    wordsTrie.insert(wordArr[i]);
  }

  // traverse the trie to find longest prefix
  const prefix = findPrefix(wordsTrie.root, []).map(obj => obj.prefix);
  
  return prefix.length ? prefix : -1;
}


//traverse every node by recursion and keep the logest common prefix array found so far
function findPrefix(node, longest) {
  if(node.prefixNum > 1 && node.value) {
    if(!longest[0] || node.prefixNum > longest[0].num) {
      longest = [{
        prefix: node.getWord(),
        num: node.prefixNum
      }];
    } else if(node.prefixNum === longest[0].num) {
      longest.push({
        prefix: node.getWord(),
        num: node.prefixNum
      });
    }
  }

  for(let key in node.children) {
    longest = findPrefix(node.children[key], longest);
  }
  return longest;
}

longestCommonPrefix(['pea', 'pear', 'apple', 'for', 'april', 'apendix', 'peace', 1]);

