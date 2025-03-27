import { Dispatch, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { get } from "@/services/utils";
import { useCFOBoardsStore } from "@/store/cfo-boards";
import { labels } from "@/components/organisms/lists/cfo-boards-list/CFOBoardsList";

export const fetchCFOBoardsData = async (setBoardState) => {
  get("main-boards/get_all_info_tree")
    .then((res) => {
      const response = res.data;
      setBoardState((prev) => ({
        ...prev,
        data: response,
        isLoading: false,
        error: null,
        selectedBoardInfo: null,
      }));
    })
    .catch(() => {
      setBoardState((prev) => ({
        ...prev,
        data: [],
        isLoading: false,
        error: "Something went wrong",
        selectedBoardInfo: null,
      }));
    });
};

export const useCFOBoards = () => {
  const pathName = usePathname();
  const { mainBoardId, boardId } = useParams();
  const { updateCFOBoardsStore } = useCFOBoardsStore();
  const [cfoBoardsState, setCFOBoardsState] =
    useState <
    CFOBoardsState >
    {
      isLoading: true,
      data: [],
      error: null,
      selectedCFOBoardInfo: null,
      executedPrompt: {
        message: [],
        table: null,
        status_code: 0,
        detail: "",
        start_time: "",
        end_time: "",
        duration_seconds: 0,
        charts: [],
      },
      breadCrumbItems: [],
      prompts: [],
      selectedPrompt: null,
      boardType: null,
    };

  useEffect(() => {
    fetchCFOBoardsData(setCFOBoardsState);
  }, []);

  useEffect(() => {
    if (mainBoardId && cfoBoardsState.data.length) {
      const tempBreadCrumbItems = [{ label: "Home", href: "/cfo" }];
      const selectedMainBoard = cfoBoardsState.data.find(
        (data) => data.main_board_id === Number(mainBoardId)
      );
      if (selectedMainBoard?.name) {
        tempBreadCrumbItems.push({
          label:
            labels[selectedMainBoard.main_board_type] ?? selectedMainBoard.name,
          ...(boardId && { href: `/cfo/main-boards/${mainBoardId}` }),
        });
      }
      if (boardId && selectedMainBoard?.boards) {
        Object.entries(selectedMainBoard.boards).forEach(([id, board]) => {
          if (id === boardId) {
            tempBreadCrumbItems.push({
              label: board.name,
            });
          }
        });
        if (cfoBoardsState.boardType !== "USE_CASES") {
          get(
            cfoBoardsState.boardType === "FORECAST"
              ? `/main-boards/boards/forecast-chat-response/board/${boardId}`
              : `/main-boards/boards/prompts/${mainBoardId}/${boardId}/prompts`
          )
            .then((res) => {
              const response = res.data;
              setCFOBoardsState((prevState) => ({
                ...prevState,
                prompts: response,
              }));
            })
            .catch(() =>
              setCFOBoardsState((prevState) => ({ ...prevState, prompts: [] }))
            );
        }
      }
      updateCFOBoardsStore({ breadCrumbItems: tempBreadCrumbItems });
    } else {
      updateCFOBoardsStore({ breadCrumbItems: [] });
    }
  }, [
    pathName,
    mainBoardId,
    boardId,
    cfoBoardsState.data,
    cfoBoardsState.boardType,
  ]);

  return { cfoBoardsState, setCFOBoardsState };
};
