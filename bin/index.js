#!/usr/bin/env node
import {Command} from 'commander';
import {baseMap} from '../src/cli.js'

const program = new Command();
program
  .version('0.0.1')
  // .command('base <calcBase>')
  .argument('<calcBase>', 'calcBase')
  .option('-a, --all', 'show all', false)
  .option('-t, --transverse', 'horizontal view', false)
  .action((calcBase, options) => {
    resolve(calcBase, options)
  })

program.parse(process.argv)

function resolve(calcBase, options){
  if (!Number(calcBase)){
    console.log('calcBase expected to be number')
    return
  }
  const {all, transverse} = options 
  let res = Number(calcBase).toString(2).split('')
  const originLength = baseMap.length
  res.unshift(...Array(originLength - res.length).fill("0"))
  let table
  if (transverse) {
    table = [res.reduce((acc, cur, index) => {
      if (cur == "0"){
        return acc
      }
      acc[baseMap[index]] = Number(cur)
      return acc
    }, {})]
  } else {
    table = baseMap.map((item, index) => {
      if(!all){
        if (res[index] == "0"){
          return undefined
        }
      }
      return {
        "key": item,
        "value": Number(res[index])
      }
    }).filter(item => item)
  }
  console.log('当前价标：', calcBase)
  console.log('当前价标二进制：', Number(calcBase).toString(2))
  console.table(table)
}
