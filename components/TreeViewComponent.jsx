/* eslint-disable no-use-before-define */
import React, { useMemo, useCallback, Dispatch, SetStateAction } from "react"
import { HiChevronDown, HiChevronUp } from "react-icons/hi"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"



const expandNodeById = (nodes, nodeId) =>
  nodes?.map((node) => {
    if (node.id === nodeId) {
      return {
        ...node,
        isSelected: node.children?.length ? !node.isSelected : true,
      }
    }

    if (node.children) {
      return {
        ...node,
        isSelected: node.isSelected,
        children: expandNodeById(node.children, nodeId),
      }
    }

    return { ...node, isSelected: false }
  })

export function Tree({
  nodes,
  setNodes,
  className,
  onTreeItemClick,
  parentType,
  ...props
}) {
  const handleNodeSelect = useCallback((nodeId) => {
    setNodes((prevNodes) => expandNodeById(prevNodes, nodeId))
  }, [])

  const renderNodes = useMemo(
    () => (items) =>
      items?.map((node) => (
        <TreeNode
          key={node.id}
          onNodeSelect={handleNodeSelect}
          {...node}
          onTreeItemClick={onTreeItemClick}
          setNodes={setNodes}
          type={node.type ?? parentType}
        />
      )),
    [handleNodeSelect],
  )

  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {renderNodes(nodes)}
    </div>
  )
}


function TreeNode({
  id,
  name,
  type,
  children,
  rightNode,
  setNodes,
  isSelected,
  onNodeSelect,
  onTreeItemClick,
  ...props
}) {
  const handleClick = useCallback(() => {
    if (onTreeItemClick) {
      onTreeItemClick({ id, name, type })
    }
    onNodeSelect(id)
  }, [id, onNodeSelect])

  return (
    <div {...props} className="space-y-1">
      <div className={cn("group flex justify-between gap-1 rounded-l-md hover:bg-[#72229B]")}>
        <Button
          className={cn(
            "w-full justify-start gap-1 p-1",
            !children?.length && isSelected && "text-[#F2D351]",
            !children?.length && "pl-7",
          )}
          onClick={handleClick}
          disabled={!children}
          variant="destructive"
          disableAnimation
        >
          {!!children?.length &&
            (isSelected ? (
              <HiChevronUp size={20} className="min-w-5" />
            ) : (
              <HiChevronDown size={20} className="min-w-5" />
            ))}

          <span>{name}</span>
        </Button>
        {rightNode && (
          <div
            className={cn(
              "hidden group-hover:flex group-hover:items-center group-hover:justify-center",
              isSelected && "flex items-center justify-center",
            )}
          >
            {rightNode}
          </div>
        )}
      </div>
      {children && isSelected && (
        <Tree
          className="pl-4"
          nodes={children}
          onTreeItemClick={onTreeItemClick}
          setNodes={setNodes}
          parentType={type}
        />
      )}
    </div>
  )
}
